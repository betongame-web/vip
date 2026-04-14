import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { buildMockSportsData } from '@/pages/Sport/sportsData';
import { formatMatchDate } from '@/pages/Sport/sportsUtils';

const CURRENT_BETS_KEY = 'sportsbook_current_bets_v2';
const FAVORITES_KEY = 'sportsbook_favorites_v2';
const HISTORY_KEY = 'sportsbook_history_v2';

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

function createTicketId(prefix = 'SB') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
}

function seedHistory(events) {
  const first = events[0];
  const second = events[1];

  if (!first || !second) return [];

  return [
    {
      id: createTicketId('HX'),
      type: 'single',
      status: 'won',
      stake: 20,
      totalOdds: 1.76,
      potentialReturn: 35.2,
      placedAt: '2026-04-12T18:00:00Z',
      placedAtLabel: formatMatchDate('2026-04-12T18:00:00Z'),
      selections: [
        {
          id: createBetId(first.id, first.markets[0].id, first.markets[0].values[0].id),
          eventId: first.id,
          homeTeam: first.teamHomeName,
          awayTeam: first.teamAwayName,
          marketName: first.markets[0].name,
          selectionValue: first.markets[0].values[0].value,
          odd: first.markets[0].values[0].odd,
          eventDate: first.date,
        },
      ],
    },
    {
      id: createTicketId('HX'),
      type: 'multiple',
      status: 'lost',
      stake: 15,
      totalOdds: 5.42,
      potentialReturn: 81.3,
      placedAt: '2026-04-11T16:20:00Z',
      placedAtLabel: formatMatchDate('2026-04-11T16:20:00Z'),
      selections: [
        {
          id: createBetId(first.id, first.markets[0].id, first.markets[0].values[1].id),
          eventId: first.id,
          homeTeam: first.teamHomeName,
          awayTeam: first.teamAwayName,
          marketName: first.markets[0].name,
          selectionValue: first.markets[0].values[1].value,
          odd: first.markets[0].values[1].odd,
          eventDate: first.date,
        },
        {
          id: createBetId(second.id, second.markets[0].id, second.markets[0].values[0].id),
          eventId: second.id,
          homeTeam: second.teamHomeName,
          awayTeam: second.teamAwayName,
          marketName: second.markets[0].name,
          selectionValue: second.markets[0].values[0].value,
          odd: second.markets[0].values[0].odd,
          eventDate: second.date,
        },
      ],
    },
  ];
}

export function SportsbookProvider({ children }) {
  const initialEvents = useMemo(() => buildMockSportsData(), []);
  const [events, setEvents] = useState(initialEvents);
  const [bets, setBets] = useState(() => readJson(CURRENT_BETS_KEY, []));
  const [favorites, setFavorites] = useState(() => readJson(FAVORITES_KEY, []));
  const [betHistory, setBetHistory] = useState(() =>
    readJson(HISTORY_KEY, seedHistory(initialEvents)),
  );

  useEffect(() => {
    writeJson(CURRENT_BETS_KEY, bets);
  }, [bets]);

  useEffect(() => {
    writeJson(FAVORITES_KEY, favorites);
  }, [favorites]);

  useEffect(() => {
    writeJson(HISTORY_KEY, betHistory);
  }, [betHistory]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setEvents((current) =>
        current.map((event) => {
          if (!event.isLive) return event;

          return {
            ...event,
            markets: event.markets.map((market) => ({
              ...market,
              values: market.values.map((value) => {
                const movement = (Math.random() - 0.5) * 0.14;
                const nextOdd = Math.max(1.05, Number((Number(value.odd) + movement).toFixed(2)));
                return { ...value, odd: nextOdd };
              }),
            })),
          };
        }),
      );
    }, 12000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const settleTimer = window.setInterval(() => {
      setBetHistory((current) => {
        const pendingIndex = current.findIndex((ticket) => ticket.status === 'pending');
        if (pendingIndex === -1) return current;

        const next = [...current];
        const currentTicket = next[pendingIndex];
        const won = Math.random() > 0.5;

        next[pendingIndex] = {
          ...currentTicket,
          status: won ? 'won' : 'lost',
        };

        return next;
      });
    }, 25000);

    return () => window.clearInterval(settleTimer);
  }, []);

  const toggleFavorite = (eventId) => {
    setFavorites((current) =>
      current.includes(eventId)
        ? current.filter((id) => id !== eventId)
        : [...current, eventId],
    );
  };

  const isFavorite = (eventId) => favorites.includes(eventId);

  const toggleBet = (event, marketIndex, selectionIndex) => {
    const market = event?.markets?.[marketIndex];
    const selection = market?.values?.[selectionIndex];
    if (!event || !market || !selection) return;

    const betId = createBetId(event.id, market.id, selection.id);

    setBets((current) => {
      const exists = current.some((bet) => bet.betId === betId);
      if (exists) {
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
          odd: Number(selection.odd),
          stake: 10,
          createdAt: new Date().toISOString(),
        },
        ...current,
      ];
    });
  };

  const isSelectionActive = (eventId, marketId, selectionId) =>
    bets.some((bet) => bet.betId === createBetId(eventId, marketId, selectionId));

  const updateBetStake = (betId, stake) => {
    const numericStake = Number(stake) || 0;
    setBets((current) =>
      current.map((bet) => (bet.betId === betId ? { ...bet, stake: numericStake } : bet)),
    );
  };

  const updateAllStakes = (stake) => {
    const numericStake = Number(stake) || 0;
    setBets((current) => current.map((bet) => ({ ...bet, stake: numericStake })));
  };

  const removeBet = (betId) => {
    setBets((current) => current.filter((bet) => bet.betId !== betId));
  };

  const clearBets = () => setBets([]);

  const totalStake = useMemo(
    () => Number(bets.reduce((sum, bet) => sum + (Number(bet.stake) || 0), 0).toFixed(2)),
    [bets],
  );

  const totalOdds = useMemo(() => {
    if (!bets.length) return 0;
    return Number(
      bets.reduce((sum, bet) => sum * (Number(bet.odd) || 1), 1).toFixed(2),
    );
  }, [bets]);

  const possiblePayout = useMemo(() => {
    if (!bets.length) return 0;
    if (bets.length === 1) {
      return Number((bets[0].stake * bets[0].odd).toFixed(2));
    }
    return Number((totalStake * totalOdds).toFixed(2));
  }, [bets, totalOdds, totalStake]);

  const placeBets = (mode = 'multiple') => {
    if (!bets.length) {
      return { ok: false, message: 'No bets selected.' };
    }

    const now = new Date().toISOString();

    const tickets =
      mode === 'single'
        ? bets.map((bet) => ({
            id: createTicketId('SB'),
            type: 'single',
            status: 'pending',
            stake: Number(bet.stake || 0),
            totalOdds: Number(bet.odd || 0),
            potentialReturn: Number(((Number(bet.stake || 0) * Number(bet.odd || 0))).toFixed(2)),
            placedAt: now,
            placedAtLabel: formatMatchDate(now),
            selections: [
              {
                id: bet.betId,
                eventId: bet.eventId,
                homeTeam: bet.homeTeam,
                awayTeam: bet.awayTeam,
                marketName: bet.marketName,
                selectionValue: bet.selectionLabel,
                odd: bet.odd,
                eventDate: bet.eventDate,
              },
            ],
          }))
        : [
            {
              id: createTicketId('MB'),
              type: 'multiple',
              status: 'pending',
              stake: totalStake,
              totalOdds,
              potentialReturn: possiblePayout,
              placedAt: now,
              placedAtLabel: formatMatchDate(now),
              selections: bets.map((bet) => ({
                id: bet.betId,
                eventId: bet.eventId,
                homeTeam: bet.homeTeam,
                awayTeam: bet.awayTeam,
                marketName: bet.marketName,
                selectionValue: bet.selectionLabel,
                odd: bet.odd,
                eventDate: bet.eventDate,
              })),
            },
          ];

    setBetHistory((current) => [...tickets, ...current]);
    setBets([]);

    return { ok: true, tickets };
  };

  const featuredEvents = useMemo(() => events.filter((event) => event.featured), [events]);
  const liveEvents = useMemo(() => events.filter((event) => event.isLive), [events]);
  const upcomingEvents = useMemo(
    () => events.filter((event) => !event.isLive && !event.finished),
    [events],
  );
  const favoriteEvents = useMemo(
    () => events.filter((event) => favorites.includes(event.id)),
    [events, favorites],
  );

  const pendingBets = useMemo(
    () => betHistory.filter((ticket) => ticket.status === 'pending'),
    [betHistory],
  );

  const settledBets = useMemo(
    () => betHistory.filter((ticket) => ticket.status !== 'pending'),
    [betHistory],
  );

  const value = useMemo(
    () => ({
      events,
      bets,
      betHistory,
      favorites,
      featuredEvents,
      liveEvents,
      upcomingEvents,
      favoriteEvents,
      pendingBets,
      settledBets,
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
    }),
    [
      events,
      bets,
      betHistory,
      favorites,
      featuredEvents,
      liveEvents,
      upcomingEvents,
      favoriteEvents,
      pendingBets,
      settledBets,
      totalStake,
      totalOdds,
      possiblePayout,
    ],
  );

  return <SportsbookContext.Provider value={value}>{children}</SportsbookContext.Provider>;
}

export function useSportsbook() {
  const value = useContext(SportsbookContext);
  if (!value) {
    throw new Error('useSportsbook must be used inside SportsbookProvider');
  }
  return value;
}