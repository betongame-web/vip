import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { buildMockSportsData } from '@/pages/Sport/sportsData';

const BETS_KEY = 'sportsbook_bets_v1';
const FAVORITES_KEY = 'sportsbook_favorites_v1';
const HISTORY_KEY = 'sportsbook_history_v1';

const SportsbookContext = createContext(null);

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createBetId(eventId, marketId, selectionId) {
  return `${eventId}-${marketId}-${selectionId}`;
}

export function SportsbookProvider({ children }) {
  const [events, setEvents] = useState(() => buildMockSportsData());
  const [bets, setBets] = useState(() => readJson(BETS_KEY, []));
  const [favorites, setFavorites] = useState(() => readJson(FAVORITES_KEY, []));
  const [betHistory, setBetHistory] = useState(() => readJson(HISTORY_KEY, []));

  useEffect(() => {
    writeJson(BETS_KEY, bets);
  }, [bets]);

  useEffect(() => {
    writeJson(FAVORITES_KEY, favorites);
  }, [favorites]);

  useEffect(() => {
    writeJson(HISTORY_KEY, betHistory);
  }, [betHistory]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setEvents((current) => current.map((event) => {
        if (!event.isLive) return event;

        return {
          ...event,
          markets: event.markets.map((market) => ({
            ...market,
            values: market.values.map((value) => {
              const movement = (Math.random() - 0.5) * 0.12;
              const nextOdd = Math.max(1.05, Number((value.odd + movement).toFixed(2)));
              return { ...value, odd: nextOdd };
            }),
          })),
        };
      }));
    }, 12000);

    return () => window.clearInterval(timer);
  }, []);

  const toggleFavorite = (eventId) => {
    setFavorites((current) => (
      current.includes(eventId)
        ? current.filter((id) => id !== eventId)
        : [...current, eventId]
    ));
  };

  const isFavorite = (eventId) => favorites.includes(eventId);

  const toggleBet = (event, marketIndex, selectionIndex) => {
    const market = event.markets[marketIndex];
    const selection = market?.values?.[selectionIndex];
    if (!market || !selection) return;

    const betId = createBetId(event.id, market.id, selection.id);
    setBets((current) => {
      const existing = current.find((bet) => bet.betId === betId);
      if (existing) {
        return current.filter((bet) => bet.betId !== betId);
      }

      return [
        {
          betId,
          eventId: event.id,
          leagueName: event.leagueName,
          leagueCountry: event.leagueCountry,
          statusLong: event.statusLong,
          eventDate: event.date,
          homeTeam: event.teamHomeName,
          awayTeam: event.teamAwayName,
          marketId: market.id,
          marketName: market.name,
          selectionId: selection.id,
          selectionLabel: selection.value,
          odd: selection.odd,
          stake: 10,
          createdAt: new Date().toISOString(),
        },
        ...current,
      ];
    });
  };

  const isSelectionActive = (eventId, marketId, selectionId) => (
    bets.some((bet) => bet.betId === createBetId(eventId, marketId, selectionId))
  );

  const updateBetStake = (betId, stake) => {
    const numericStake = Number(stake) || 0;
    setBets((current) => current.map((bet) => (
      bet.betId === betId ? { ...bet, stake: numericStake } : bet
    )));
  };

  const updateAllStakes = (stake) => {
    const numericStake = Number(stake) || 0;
    setBets((current) => current.map((bet) => ({ ...bet, stake: numericStake })));
  };

  const removeBet = (betId) => {
    setBets((current) => current.filter((bet) => bet.betId !== betId));
  };

  const clearBets = () => setBets([]);

  const placeBets = (mode = 'multiple') => {
    if (!bets.length) {
      return { ok: false, message: 'No bets selected.' };
    }

    const now = new Date().toISOString();
    const tickets = mode === 'single'
      ? bets.map((bet) => ({
          ticketId: `SB-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
          placedAt: now,
          type: 'Single',
          status: 'Pending',
          totalStake: bet.stake,
          totalOdds: bet.odd,
          possibleWin: Number((bet.stake * bet.odd).toFixed(2)),
          selections: [bet],
        }))
      : [{
          ticketId: `MB-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
          placedAt: now,
          type: 'Multiple',
          status: 'Pending',
          totalStake: totalStake,
          totalOdds: totalOdds,
          possibleWin: possiblePayout,
          selections: bets,
        }];

    setBetHistory((current) => [...tickets, ...current]);
    setBets([]);

    return { ok: true, count: tickets.length, tickets };
  };

  const featuredEvents = useMemo(() => events.filter((event) => event.featured), [events]);
  const liveEvents = useMemo(() => events.filter((event) => event.isLive), [events]);
  const upcomingEvents = useMemo(() => events.filter((event) => !event.finished), [events]);
  const favoriteEvents = useMemo(() => events.filter((event) => favorites.includes(event.id)), [events, favorites]);
  const groupedByDate = useMemo(() => {
    return upcomingEvents.reduce((acc, event) => {
      const key = event.date.slice(0, 10);
      if (!acc[key]) acc[key] = [];
      acc[key].push(event);
      return acc;
    }, {});
  }, [upcomingEvents]);

  const totalStake = useMemo(
    () => Number(bets.reduce((sum, bet) => sum + (Number(bet.stake) || 0), 0).toFixed(2)),
    [bets],
  );
  const totalOdds = useMemo(
    () => Number(bets.reduce((sum, bet) => sum * (Number(bet.odd) || 1), 1).toFixed(2)),
    [bets],
  );
  const possiblePayout = useMemo(
    () => Number((totalStake * (bets.length > 1 ? totalOdds : (bets[0]?.odd || 1))).toFixed(2)),
    [bets, totalOdds, totalStake],
  );

  const value = useMemo(() => ({
    events,
    bets,
    betHistory,
    favorites,
    featuredEvents,
    liveEvents,
    upcomingEvents,
    favoriteEvents,
    groupedByDate,
    totalStake,
    totalOdds,
    possiblePayout,
    toggleFavorite,
    isFavorite,
    toggleBet,
    isSelectionActive,
    updateBetStake,
    updateAllStakes,
    removeBet,
    clearBets,
    placeBets,
  }), [
    events,
    bets,
    betHistory,
    favorites,
    featuredEvents,
    liveEvents,
    upcomingEvents,
    favoriteEvents,
    groupedByDate,
    totalStake,
    totalOdds,
    possiblePayout,
  ]);

  return <SportsbookContext.Provider value={value}>{children}</SportsbookContext.Provider>;
}

export function useSportsbook() {
  const value = useContext(SportsbookContext);
  if (!value) {
    throw new Error('useSportsbook must be used inside SportsbookProvider');
  }
  return value;
}
