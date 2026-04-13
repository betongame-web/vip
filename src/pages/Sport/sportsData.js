const baseMarkets = (home, away, homeOdd, drawOdd, awayOdd) => ([
  {
    id: 'match-result',
    name: 'Match Result',
    values: [
      { id: 'home', value: `1 • ${home}`, odd: homeOdd },
      { id: 'draw', value: 'X • Draw', odd: drawOdd },
      { id: 'away', value: `2 • ${away}`, odd: awayOdd },
    ],
  },
  {
    id: 'goals',
    name: 'Goals 2.5',
    values: [
      { id: 'over25', value: 'Over 2.5', odd: Number((homeOdd + 0.1).toFixed(2)) },
      { id: 'under25', value: 'Under 2.5', odd: Number((awayOdd - 0.15).toFixed(2)) },
    ],
  },
  {
    id: 'btts',
    name: 'Both Teams To Score',
    values: [
      { id: 'yes', value: 'Yes', odd: Number((drawOdd - 0.18).toFixed(2)) },
      { id: 'no', value: 'No', odd: Number((homeOdd + 0.35).toFixed(2)) },
    ],
  },
]);

export function buildMockSportsData() {
  return [
    makeEvent(1001, 'England', 'Premier League', 'Liverpool', 'Chelsea', '2026-04-13T18:00:00Z', 'First Half', 1, 0, 'premier-league', true, true, 1.76, 3.45, 4.85),
    makeEvent(1002, 'Spain', 'La Liga', 'Barcelona', 'Sevilla', '2026-04-13T19:30:00Z', 'Not Started', 0, 0, 'la-liga', true, false, 1.62, 4.1, 5.4),
    makeEvent(1003, 'Italy', 'Serie A', 'Inter', 'Napoli', '2026-04-14T16:00:00Z', 'Not Started', 0, 0, 'serie-a', false, false, 2.02, 3.2, 3.55),
    makeEvent(1004, 'Germany', 'Bundesliga', 'Bayern', 'Leipzig', '2026-04-14T18:30:00Z', 'Not Started', 0, 0, 'bundesliga', true, false, 1.71, 3.7, 4.75),
    makeEvent(1005, 'France', 'Ligue 1', 'PSG', 'Marseille', '2026-04-15T19:00:00Z', 'Not Started', 0, 0, 'ligue-1', false, false, 1.68, 3.95, 5.15),
    makeEvent(1006, 'Europe', 'Champions League', 'Real Madrid', 'Man City', '2026-04-15T20:00:00Z', 'Not Started', 0, 0, 'champions-league', true, false, 2.28, 3.4, 2.82),
    makeEvent(1007, 'Portugal', 'Primeira Liga', 'Benfica', 'Porto', '2026-04-16T18:45:00Z', 'Not Started', 0, 0, 'primeira-liga', false, false, 2.11, 3.1, 3.35),
    makeEvent(1008, 'Saudi Arabia', 'Saudi Pro League', 'Al Hilal', 'Al Nassr', '2026-04-16T20:15:00Z', 'Second Half', 2, 2, 'saudi-pro-league', true, true, 2.22, 3.55, 2.71),
    makeEvent(1009, 'Netherlands', 'Eredivisie', 'Ajax', 'PSV', '2026-04-17T18:00:00Z', 'Not Started', 0, 0, 'eredivisie', false, false, 2.55, 3.45, 2.48),
    makeEvent(1010, 'Turkey', 'Super Lig', 'Galatasaray', 'Fenerbahce', '2026-04-17T19:00:00Z', 'Not Started', 0, 0, 'super-lig', false, false, 2.18, 3.25, 3.08),
    makeEvent(1011, 'Brazil', 'Serie A Brazil', 'Flamengo', 'Palmeiras', '2026-04-18T21:00:00Z', 'Not Started', 0, 0, 'serie-a-brazil', false, false, 2.4, 3.0, 2.95),
    makeEvent(1012, 'USA', 'MLS', 'Inter Miami', 'LAFC', '2026-04-19T00:00:00Z', 'Not Started', 0, 0, 'mls', true, false, 2.03, 3.5, 3.42),
  ];
}

function makeEvent(id, leagueCountry, leagueName, home, away, date, statusLong, goalsHome, goalsAway, category, featured, isLive, homeOdd, drawOdd, awayOdd) {
  return {
    id,
    leagueCountry,
    leagueName,
    leagueSeason: 2026,
    leagueRound: 'Round 30',
    stadium: `${home} Arena`,
    date,
    statusLong,
    goalsHome,
    goalsAway,
    teamHomeName: home,
    teamAwayName: away,
    category,
    featured,
    isLive,
    finished: statusLong === 'Full Time',
    description: `${home} vs ${away} in ${leagueName}.`,
    markets: baseMarkets(home, away, homeOdd, drawOdd, awayOdd),
  };
}
