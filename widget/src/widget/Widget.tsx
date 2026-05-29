const percentToFontWeight = (value: number) => {
  const clamped = Math.max(0, Math.min(100, value));
  return Math.round(100 + (clamped / 100) * 800);
};
import { Statistic } from '../components/Statistic.tsx';
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  CSSProperties,
  useMemo,
  useLayoutEffect,
  ReactElement,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Language,
  languages,
  tl,
} from '../../../src/translations/translations.ts';
import {
  getPlayerStats,
  VerifiedBadgeType,
} from '../utils/faceit_util.ts';
import { Level1 } from '../components/levels/Level1.tsx';
import { Level2 } from '../components/levels/Level2.tsx';
import { Level3 } from '../components/levels/Level3.tsx';
import { Level4 } from '../components/levels/Level4.tsx';
import { Level5 } from '../components/levels/Level5.tsx';
import { Level6 } from '../components/levels/Level6.tsx';
import { Level7 } from '../components/levels/Level7.tsx';
import { Level8 } from '../components/levels/Level8.tsx';
import { Level9 } from '../components/levels/Level9.tsx';
import { Level10 } from '../components/levels/Level10.tsx';
import { Challenger } from '../components/levels/Challenger.tsx';

import { StatisticType } from '../../../src/generator/tabs/StatisticsTab.tsx';

import '../styles/themes/normal.less';
import '../styles/themes/animated.less';
import '../styles/themes/rounded.less';
import '../styles/themes/compact.less';
import '../styles/themes/rounded-compact.less';
import '../styles/themes/radar.less';
import '../styles/themes/classic.less';
const BANNER_RADIUS_MAP: Record<string, number> = {
  normal: 12,
  rounded: 16,
  'rounded-compact': 20,
  compact: 12,
  radar: 100,
  classic: 6,
  amoled: 12,
  aurora: 16,
  auroraflow: 16,
  banner: 12,
  card: 14,
  circle: 50,
  circuit: 14,
  glass: 16,
  horizon: 10,
  justelo: 12,
  justelomatches: 12,
  justelomatchesname: 12,
  justeloname: 12,
  neon: 14,
  photon: 16,
  pulsegrid: 14,
  ripple: 50,
  sidebar: 12,
  split: 12,
  stack: 12,
  terminal: 8,
};

// NEW themes
import '../styles/themes/amoled.less';
import '../styles/themes/aurora.less';
import '../styles/themes/auroraflow.less';
import '../styles/themes/banner.less';
import '../styles/themes/card.less';
import '../styles/themes/circle.less';
import '../styles/themes/circuit.less';
import '../styles/themes/glass.less';
import '../styles/themes/horizon.less';
import '../styles/themes/justelo.less';
import '../styles/themes/justelomatches.less';
import '../styles/themes/justelomatchesname.less';
import '../styles/themes/justeloname.less';
import '../styles/themes/neon.less';
import '../styles/themes/photon.less';
import '../styles/themes/pulsegrid.less';
import '../styles/themes/radar.less';
import '../styles/themes/ripple.less';
import '../styles/themes/sidebar.less';
import '../styles/themes/split.less';
import '../styles/themes/stack.less';
import '../styles/themes/terminal.less';

import '../styles/color_schemes.less';
import { SettingsContext } from '../../../src/generator/Generator.tsx';
import { useSettings } from '../../../src/settings/manager.ts';
import { TimelineIcon } from '../../../src/assets/icons/tabler/TimelineIcon.tsx';
import { ArrowUpIcon } from '../../../src/assets/icons/tabler/ArrowUpIcon.tsx';
import { ArrowDownIcon } from '../../../src/assets/icons/tabler/ArrowDownIcon.tsx';
import { VerifiedBadgeIcon } from '../../../src/assets/icons/faceit/VerifiedBadgeIcon.tsx';
import { VerifiedGoldBadgeIcon } from '../../../src/assets/icons/faceit/VerifiedGoldBadgeIcon.tsx';

const REGION_FLAG_MAP: Record<string, string> = {
  EU: 'eu',
};

const levelIcons = [
  <Level1 />,
  <Level2 />,
  <Level3 />,
  <Level4 />,
  <Level5 />,
  <Level6 />,
  <Level7 />,
  <Level8 />,
  <Level9 />,
  <Level10 />,
  <Challenger />,
  <Challenger />,
  <Challenger />,
  <Challenger />,
];

const eloDistribution = [
  ['#eee', 100, 500],
  ['#1CE400', 501, 750],
  ['#1CE400', 751, 900],
  ['#FFC800', 901, 1050],
  ['#FFC800', 1051, 1200],
  ['#FFC800', 1201, 1350],
  ['#FFC800', 1351, 1530],
  ['#FF6309', 1531, 1750],
  ['#FF6309', 1750, 2000],
  ['#FE1F00', 2001],
  ['#e80128', 2001] /* Challenger: 4-1000 */,
  ['#d9a441', 2001] /* Challenger: 1 */,
  ['#c7d0d5', 2001] /* Challenger: 2 */,
  ['#bf7145', 2001] /* Challenger: 3 */,
];

export enum ShowRanking {
  DISABLED = 0,
  SHOW = 1,
  ONLY_WHEN_CHALLENGER = 2,
  COUNTRY = 3,
  BOTH = 4,
}

type AnimatedCardKey = 'header' | 'stats' | 'matches';

const BANNER_FONT_FAMILY_MAP: Record<string, string> = {
  dm_sans: "'DM Sans', sans-serif",
  arial: 'Arial, sans-serif',
  comic_sans_ms: "'Comic Sans MS', cursive",
  courier_new: "'Courier New', monospace",
  garamond: 'Garamond, serif',
  georgia: 'Georgia, serif',
  helvetica: 'Helvetica, Arial, sans-serif',
  impact: 'Impact, sans-serif',
  inter: "'Inter', sans-serif",
  lucida_sans: "'Lucida Sans', sans-serif",
  merriweather: "'Merriweather', serif",
  montserrat: "'Montserrat', sans-serif",
  open_sans: "'Open Sans', sans-serif",
  oswald: "'Oswald', sans-serif",
  palatino_linotype: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
  playfair_display: "'Playfair Display', serif",
  poppins: "'Poppins', sans-serif",
  roboto: "'Roboto', sans-serif",
  segoe_ui: "'Segoe UI', sans-serif",
  tahoma: 'Tahoma, sans-serif',
  times_new_roman: "'Times New Roman', serif",
  trebuchet_ms: "'Trebuchet MS', sans-serif",
  verdana: 'Verdana, sans-serif',
  kick_font: "'KickFont', sans-serif",
};

const hexToRgba = (hexColor: string, opacity: number) => {
  const hex = hexColor.replace('#', '').trim();

  let r = 0;
  let g = 0;
  let b = 0;
  let baseAlpha = 1;

  if (hex.length === 3 || hex.length === 4) {
    r = parseInt(`${hex[0]}${hex[0]}`, 16);
    g = parseInt(`${hex[1]}${hex[1]}`, 16);
    b = parseInt(`${hex[2]}${hex[2]}`, 16);
    if (hex.length === 4) {
      baseAlpha = parseInt(`${hex[3]}${hex[3]}`, 16) / 255;
    }
  } else if (hex.length === 6 || hex.length === 8) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
    if (hex.length === 8) {
      baseAlpha = parseInt(hex.substring(6, 8), 16) / 255;
    }
  }

  const clampedOpacity = Math.max(0, Math.min(1, opacity));
  const alpha = Math.max(0, Math.min(1, baseAlpha * clampedOpacity));

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


const percentToFontScale = (value: number) => {
  const clamped = Math.max(0, Math.min(100, value));
  return 0.5 + clamped / 100;
};

export const Widget = ({
  preview,
  previewAvatar,
  previewBanner,
  previewUsername,
  previewRegion,
  previewCountry,
  previewVerifiedBadge,
  previewElo,
  previewLevel,
  previewLanguage,
}: {
  preview: boolean;
  previewAvatar?: string;
  previewBanner?: string;
  previewUsername?: string;
  previewRegion?: string;
  previewCountry?: string;
  previewVerifiedBadge?: VerifiedBadgeType;
  previewElo?: number;
  previewLevel?: number;
  previewLanguage?: Language;
}) => {
  const [username, setUsername] = useState<string>();
  const [avatar, setAvatar] = useState<string>();
  const [banner, setBanner] = useState<string>();
  const [verifiedBadge, setVerifiedBadge] = useState<VerifiedBadgeType>('none');

  const [level, setLevel] = useState(1);
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [startingElo, setStartingElo] = useState<number>(0);
  const [elo, setElo] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ranking, setRanking] = useState(0);
  const [countryRanking, setCountryRanking] = useState(0);
  const [country, setCountry] = useState<string | undefined>();
  const [region, setRegion] = useState<string | undefined>();
  const [adr, setAdr] = useState(0);
  const [assists, setAssists] = useState(0);
  const [mvps, setMvps] = useState(0);
  const [krRatio, setKrRatio] = useState(0);
  const [kills, setKills] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [kdRatio, setKDRatio] = useState(0);
  const [hsPercent, setHSPercent] = useState(0);
  const [winsPercent, setWinsPercent] = useState(0);
  const [avgMatches, setAvgMatches] = useState(0);
  const [currentEloDistribution, setCurrentEloDistribution] = useState<
    [number, (string | number)[]]
  >([1, eloDistribution[0]]);
  const [compatibilityMode, setCompatibilityMode] = useState<boolean>(false);
  const [stats, setStats] = useState<StatisticType[]>([
    StatisticType.KILLS,
    StatisticType.KD,
    StatisticType.WINRATIO,
    StatisticType.HSPERCENT,
  ]);
  const [animatedDeckIndex, setAnimatedDeckIndex] = useState(0);
  const [animatedDeckHeight, setAnimatedDeckHeight] = useState<number>(0);
  const animatedMeasureRef = useRef<HTMLDivElement>(null);

  const { settings, getSetting, setSetting, loadSettingsFromQuery } =
    useSettings(true);
  const overrides = useContext(SettingsContext);

  const SETTINGS = useMemo(() => {
    return overrides || { settings, get: getSetting, set: setSetting };
  }, [overrides, settings]);

  const translate = useCallback(
    (text: string, args?: string[]) => {
      return tl(language, text, args);
    },
    [language]
  );

  const [searchParams] = useSearchParams();
    // Dynamicznie dodaj/usuń link do Kick Font
    useEffect(() => {
      if (SETTINGS.get('bannerFont') === 'kick_font') {
        if (!document.getElementById('kick-font-link')) {
          const link = document.createElement('link');
          link.id = 'kick-font-link';
          link.rel = 'stylesheet';
          link.href = '/fonts/kick-font.css';
          document.head.appendChild(link);
        }
      } else {
        const existing = document.getElementById('kick-font-link');
        if (existing) existing.remove();
      }
    }, [SETTINGS]);

  useEffect(() => {
    if (!previewElo || !previewLevel) return;
    setElo(previewElo);
    setLevel(previewLevel);
    setCurrentEloDistribution(getEloDistribution(previewLevel, 1337));
  }, [previewElo, previewLevel]);

  useEffect(() => {
    if (!overrides || !preview) return;
    setStats([
      overrides.get('statSlot1'),
      overrides.get('statSlot2'),
      overrides.get('statSlot3'),
      overrides.get('statSlot4'),
    ]);
  }, [preview, overrides]);

  /* Load settings */
  useLayoutEffect(() => {
    if (preview) return;
    loadSettingsFromQuery();
    const statsQ = searchParams.get('stats');
    if (statsQ) setStats(statsQ.split(',') as StatisticType[]);
  }, [searchParams]);

  useLayoutEffect(() => {
    setLanguage(
      languages.find((lang) => lang.id === SETTINGS.get('widgetLanguage')) ||
        previewLanguage ||
        languages[0]
    );
  }, [SETTINGS]);

  /** Returns a path to a level icon */
  const getIcon = useCallback(() => {
    if (level === 10 && ranking <= 1000 && !preview) {
      if (ranking === 1) return levelIcons[11];
      else if (ranking === 2) return levelIcons[12];
      else if (ranking === 3) return levelIcons[13];
      return levelIcons[10]; /* Challenger */
    }
    return levelIcons[level - 1];
  }, [level, ranking, preview]);

  /** Returns a color, min ELO and max ELO of a level */
  const getEloDistribution = useCallback(
    (level: number, ranking: number): [number, (string | number)[]] => {
      if (level === 10 && ranking <= 1000) {
        if (ranking === 1) return [12, eloDistribution[11]];
        else if (ranking === 2) return [13, eloDistribution[12]];
        else if (ranking === 3) return [14, eloDistribution[13]];
        return [11, eloDistribution[10]]; /* Challenger */
      }
      return [level, eloDistribution[level - 1]];
    },
    [preview]
  );

  /* Update player stats */
  useEffect(() => {
    if (preview) return;
    console.log(
      `%cWidget settings:%c\n%o`,
      'font-weight: bold;',
      '',
      SETTINGS.settings
    );
    let startDate = new Date();
    const savedStartDate = localStorage.getItem('fcw_session_start');
    const savedPlayerId = localStorage.getItem('fcw_session_player-id');
    const saveSession = SETTINGS.get('saveSession');
    const playerId = SETTINGS.get('playerId');
    if (saveSession && savedStartDate && savedPlayerId === playerId) {
      console.log('Loaded starting date from session.');
      startDate = new Date(savedStartDate);
    }
    if (!playerId) {
      return;
    }
    const getStats = (firstTime?: boolean) => {
      getPlayerStats(
        playerId,
        SETTINGS.get('averageStatsMatchCount'),
        startDate,
        searchParams.get('only_official') === 'true'
      ).then((player) => {
        if (!player) return;
        setUsername(player.username);
        setAvatar(player.avatar);
        setBanner(player.banner);
        setVerifiedBadge(player.verifiedBadge);

        if (!player || !player.elo || !player.level) return;
        if (firstTime) {
          if (saveSession) {
            let expired = false;
            const sessionEnd = localStorage.getItem('fcw_session_end');
            const startingElo = localStorage.getItem(
              'fcw_session_starting-elo'
            );
            if (!sessionEnd) {
              expired = true;
            } else {
              const sessionEndDate = new Date(sessionEnd);
              if (new Date() > sessionEndDate) {
                expired = true;
              }
            }
            if (playerId !== savedPlayerId) {
              expired = true;
            }
            if (expired) {
              /* Save saved session data */
              console.log('Session expired. Saving new data...');
              localStorage.setItem(
                'fcw_session_starting-elo',
                String(player.elo)
              );
              localStorage.setItem('fcw_session_start', new Date().toString());
              localStorage.setItem('fcw_session_player-id', playerId);
            }
            const currentDate = new Date();
            currentDate.setTime(currentDate.getTime() + 1000 * 60 * 60 * 2);
            localStorage.setItem('fcw_session_end', currentDate.toString());
            /* Load saved session ELO */
            if (startingElo && !expired) {
              setStartingElo(Number(startingElo));
            } else {
              setStartingElo(player.elo);
            }
          } else {
            setStartingElo(player.elo);
          }
        }

        if (!firstTime && saveSession) {
          const currentDate = new Date();
          currentDate.setTime(currentDate.getTime() + 1000 * 60 * 60 * 2);
          localStorage.setItem('fcw_session_end', currentDate.toString());
        }

        setElo(player.elo);
        setLevel(player.level);

        setWins(player.wins);
        setLosses(player.losses);

        setAdr(player.avg.adr);
        setAssists(player.avg.assists);
        setMvps(player.avg.mvps);
        setKrRatio(player.avg.kr);
        setKills(player.avg.kills);
        setDeaths(player.avg.deaths);
        setKDRatio(player.avg.kd);
        setHSPercent(player.avg.hspercent);
        setWinsPercent(
          Math.round((player.avg.wins / player.avg.matches) * 100)
        );
        setAvgMatches(player.avg.matches);

        setRanking(player.ranking);
        setCountryRanking(player.countryRanking);
        setCountry(player.country);
        setRegion(player.region);
        setCurrentEloDistribution(
          getEloDistribution(player.level, player.ranking)
        );
      });
    };
    getStats(true);

    /* Check for older Chromium version */
    const userAgent = window.navigator.userAgent;
    const chromeVersion = userAgent
      .split(' ')
      .find((version) => version.startsWith('Chrome/'));
    if (
      chromeVersion &&
      parseInt(chromeVersion.split('/')[1].split('.')[0]) < 120
    ) {
      setCompatibilityMode(true);
    }

    let refreshDelay = 60;
    const refreshParam = searchParams.get('refresh');
    if (refreshParam) {
      refreshDelay = parseInt(refreshParam);
    }

    if (refreshDelay < 10) {
      refreshDelay = 10;
    }

    /* Set widget style and color scheme */
    document
      .getElementsByTagName('html')[0]
      .classList.add(`${SETTINGS.get('style')}-theme`);
    document
      .getElementsByTagName('html')[0]
      .classList.add(`${SETTINGS.get('colorScheme')}-scheme`);
    if (SETTINGS.get('autoWidth'))
      document.getElementsByTagName('html')[0].classList.add(`auto-width`);

    const interval = setInterval(
      getStats,
      1000 * SETTINGS.get('refreshInterval') || 60000
    );
    return () => {
      clearInterval(interval);
      document
        .getElementsByTagName('html')[0]
        .classList.remove(`${SETTINGS.get('style')}-theme`);
      document
        .getElementsByTagName('html')[0]
        .classList.remove(`${SETTINGS.get('colorScheme')}-scheme`);
      if (SETTINGS.get('autoWidth'))
        document.getElementsByTagName('html')[0].classList.remove(`auto-width`);
    };
  }, [SETTINGS]);

  /* Custom CSS */
  useEffect(() => {
    const customCSS = SETTINGS.get('customCSS');
    if (SETTINGS.get('style') !== 'custom' || !customCSS) return;

    const head = document.head;
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = customCSS;

    head.appendChild(link);
    return () => {
      head.removeChild(link);
    };
  }, [SETTINGS]);

  /** Returns player statistic */
  const getStat = useCallback(
    (stat: StatisticType) => {
      switch (stat) {
        case StatisticType.ADR:
          if (!preview && (!adr || !avgMatches)) return null;
          return `${preview ? '82.5' : Math.round((adr / avgMatches) * 10) / 10}`;
        case StatisticType.ASSISTS:
          if (!preview && (!assists || !avgMatches)) return null;
          return `${preview ? 4 : Math.round(assists / avgMatches)}`;
        case StatisticType.MVPS:
          if (!preview && (!mvps || !avgMatches)) return null;
          return `${preview ? 3 : Math.round(mvps / avgMatches)}`;
        case StatisticType.KR:
          if (!preview && (!krRatio || !avgMatches)) return null;
          return `${preview ? '0.9' : Math.round((krRatio / avgMatches) * 100) / 100}`;
        case StatisticType.KILLS:
          if (!preview && (!kills || !avgMatches)) return null;
          return `${preview ? 20 : Math.round(kills / avgMatches)}`;
        case StatisticType.DEATHS:
          if (!preview && (!deaths || !avgMatches)) return null;
          return `${preview ? 10 : Math.round(deaths / avgMatches)}`;
        case StatisticType.HSPERCENT:
          if (!preview && (!hsPercent || !avgMatches)) return null;
          return `${preview ? '50' : Math.round(hsPercent / avgMatches)}%`;
        case StatisticType.KD:
          if (!preview && (!kdRatio || !avgMatches)) return null;
          return `${preview ? '2' : Math.round((kdRatio / avgMatches) * 100) / 100}`;
        case StatisticType.WINRATIO:
          if (!preview && !winsPercent) return null;
          return `${preview ? '50' : winsPercent}%`;
        case StatisticType.RANKING:
          if (!preview && !ranking) return null;
          return `#${preview ? 999 : ranking}`;
        default:
          return `???`;
      }
    },
    [
      adr,
      assists,
      mvps,
      krRatio,
      kills,
      deaths,
      winsPercent,
      hsPercent,
      kdRatio,
      ranking,
      avgMatches,
    ]
  );

  /** Returns player ELO text */
  const getEloDiff = useCallback(() => {
    let diff = 0;

    if (!preview) {
      diff = elo - startingElo;
    }

    let diffArrow: ReactElement | null = null;
    let diffStyle: string = '';

    if (diff > 0) {
      diffArrow = <ArrowUpIcon />;
      diffStyle = 'gain';
    } else if (diff < 0) {
      diffArrow = <ArrowDownIcon />;
      diffStyle = 'loss';
    }

    return (
      <span className={`diff ${diffStyle}`}>
        ({SETTINGS.get('showIcons') ? diffArrow : null}
        {diff >= 0 ? `+${diff}` : String(diff)})
      </span>
    );
  }, [language, elo, startingElo, SETTINGS]);

  const hasStatsToShow = preview || stats.some((stat) => getStat(stat) !== null);
  const hasMatchesToShow = preview || wins > 0 || losses > 0;
  const isAnimatedStyle = SETTINGS.get('style') === 'animated';

  const animatedCardOrder = [
    {
      key: 'header' as AnimatedCardKey,
      order: Number(SETTINGS.get('animatedDeckOrderHeader') || 1),
      visible: Boolean(SETTINGS.get('animatedDeckShowHeader')),
    },
    {
      key: 'stats' as AnimatedCardKey,
      order: Number(SETTINGS.get('animatedDeckOrderStats') || 2),
      visible: Boolean(SETTINGS.get('animatedDeckShowStats')) &&
        Boolean(SETTINGS.get('showStatistics')) &&
        hasStatsToShow,
    },
    {
      key: 'matches' as AnimatedCardKey,
      order: Number(SETTINGS.get('animatedDeckOrderMatches') || 3),
      visible: Boolean(SETTINGS.get('animatedDeckShowMatches')) && hasMatchesToShow,
    },
  ]
    .filter((entry) => entry.visible)
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (!isAnimatedStyle) {
      setAnimatedDeckIndex(0);
      return;
    }

    if (animatedCardOrder.length <= 1) {
      setAnimatedDeckIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setAnimatedDeckIndex((previous) =>
        (previous + 1) % animatedCardOrder.length
      );
    }, 4200);

    return () => {
      clearInterval(interval);
    };
  }, [isAnimatedStyle, animatedCardOrder.length]);

  useEffect(() => {
    if (animatedCardOrder.length === 0) {
      setAnimatedDeckIndex(0);
      return;
    }

    if (animatedDeckIndex >= animatedCardOrder.length) {
      setAnimatedDeckIndex(0);
    }
  }, [animatedCardOrder.length, animatedDeckIndex]);

  useLayoutEffect(() => {
    if (!isAnimatedStyle) {
      setAnimatedDeckHeight(0);
      return;
    }

    const measureRoot = animatedMeasureRef.current;
    if (!measureRoot) {
      return;
    }

    const cards = Array.from(
      measureRoot.querySelectorAll('.animated-card')
    ) as HTMLElement[];
    if (cards.length === 0) {
      setAnimatedDeckHeight(0);
      return;
    }

    const maxHeight = Math.max(...cards.map((card) => card.offsetHeight));
    setAnimatedDeckHeight(maxHeight);
  }, [isAnimatedStyle, animatedCardOrder.length, SETTINGS.settings, wins, losses, elo, ranking, countryRanking, stats]);

  const renderHeaderCard = (showProgressInsideHeader = false) => (
    <>
      <div className={'level'}>
        {SETTINGS.get('showLevelIcon') && getIcon()}

        <div className={'elo'}>
          {SETTINGS.get('showUsername') && (
            <h2 className={elo === 0 ? 'skeleton' : ''}>
              {username || previewUsername || 'Player'}{' '}
              {SETTINGS.get('showVerifiedBadge') &&
                (preview
                  ? previewVerifiedBadge && previewVerifiedBadge !== 'none'
                  : verifiedBadge !== 'none') && (
                  <span className={'verified-badge'}>
                    {(preview ? previewVerifiedBadge : verifiedBadge) === 'gold' ? (
                      <VerifiedGoldBadgeIcon />
                    ) : (
                      <VerifiedBadgeIcon />
                    )}
                  </span>
                )}
            </h2>
          )}
          <p
            className={`${SETTINGS.get('showUsername') ? '' : 'username-hidden'} ${elo === 0 ? 'skeleton' : ''}`}
          >
            {SETTINGS.get('showIcons') && <TimelineIcon />}{' '}
            <span className={'elo-value'}>{String(elo)}</span>
            {SETTINGS.get('showEloSuffix') && (
              <span className={'elo-suffix'}>ELO</span>
            )}{' '}
            {SETTINGS.get('showEloDiff') && getEloDiff()}
          </p>
          {SETTINGS.get('showRanking') !== ShowRanking.DISABLED && (
            <p className={'ranking'}>
              {(SETTINGS.get('showRanking') === ShowRanking.SHOW ||
                SETTINGS.get('showRanking') === ShowRanking.BOTH ||
                (SETTINGS.get('showRanking') ===
                  ShowRanking.ONLY_WHEN_CHALLENGER &&
                  ranking <= 1000 &&
                  !preview)) && (
                <span className={`region-ranking ${!preview && ranking === 0 ? 'skeleton' : ''}`}>
                  {REGION_FLAG_MAP[(preview ? previewRegion || 'EU' : region || 'EU').toUpperCase()] ? (
                    <img
                      className={'flag'}
                      src={`https://flagcdn.com/${REGION_FLAG_MAP[(preview ? previewRegion || 'EU' : region || 'EU').toUpperCase()]}.svg`}
                      alt={preview ? previewRegion || 'EU' : region || 'EU'}
                    />
                  ) : (
                    <span className={'no-icon'}>{(preview ? previewRegion || 'EU' : region || 'EU').toUpperCase()}</span>
                  )}
                  {`#${ranking || 1337}`}
                </span>
              )}
              {(SETTINGS.get('showRanking') === ShowRanking.COUNTRY ||
                SETTINGS.get('showRanking') === ShowRanking.BOTH) && (
                <span className={`country-ranking ${!preview && countryRanking === 0 ? 'skeleton' : ''}`}>
                  {(preview ? previewCountry : country) ? (
                    <img
                      className={'flag'}
                      src={`https://flagcdn.com/${preview ? previewCountry : country}.svg`}
                      alt={preview ? previewCountry : country}
                    />
                  ) : (
                    <span className={'no-icon'}>{(preview ? previewCountry || '?' : country || '?').toUpperCase()}</span>
                  )}
                  {`#${preview ? 1337 : countryRanking || 1337}`}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
      {showProgressInsideHeader && SETTINGS.get('showEloProgressBar') && (
        <div className={'progress-bar'}>
          <div
            className={'progress'}
            style={{
              width:
                level === 10
                  ? '100%'
                  : `${((elo - (currentEloDistribution[1][1] as number)) / ((currentEloDistribution[1][2] as number) - (currentEloDistribution[1][1] as number))) * 100}%`,
            }}
          ></div>
        </div>
      )}
    </>
  );

  const renderStatsCard = () => (
    <div className={'average'}>
      {stats.map((stat) => {
        return (
          <div className={'stat'} key={`animated-stat-${stat}`}>
            <p>{translate(`widget.${stat.toLowerCase()}`)}</p>
            <p>{getStat(stat) || <span className={'skeleton'}>???</span>}</p>
          </div>
        );
      })}
    </div>
  );

  const renderMatchesCard = () => (
    <div className={'matches'}>
      <div className={'stats'}>
        <Statistic color={'green'} value={String(wins)} text={translate('widget.wins')} />
        <Statistic color={'red'} value={String(losses)} text={translate('widget.losses')} />
      </div>
    </div>
  );

  return (
    <>
      {SETTINGS.get('colorScheme') === 'custom' && (
        <style>{`
                .wrapper {
                    --text: #${SETTINGS.get('customTextColor')} !important;
                    --subtext: #${SETTINGS.get('customTextColor')} !important;
              --border-1: ${hexToRgba(SETTINGS.get('customBorderColor1') as string, SETTINGS.get('customBorderColor1Opacity') as number)} !important;
              --border-2: ${hexToRgba(SETTINGS.get('customBorderColor2') as string, SETTINGS.get('customBorderColor2Opacity') as number)} !important;
            ${SETTINGS.get('adjustBorderWidth') ? `--border-width: ${SETTINGS.get('borderWidth')}px !important;` : ''}
            ${SETTINGS.get('adjustBorderWidth') && (SETTINGS.get('borderWidth') as number) <= 0 ? `--border-overlay-opacity: 0 !important;` : ''}
                ${SETTINGS.get('adjustStatisticsSeparator') ? `--stats-separator-color: ${hexToRgba(SETTINGS.get('customStatisticsSeparatorColor') as string, SETTINGS.get('customStatisticsSeparatorOpacity') as number)} !important;` : ''}
            ${SETTINGS.get('adjustStatisticsSeparator') ? `--stats-separator-width: ${SETTINGS.get('statisticsSeparatorWidth')}px !important;` : ''}
                    --border-rotation: 0deg !important;
                    --background: #${SETTINGS.get('customBackgroundColor')} !important;
                }
            `}</style>
      )}
      {(SETTINGS.get('useBannerAsBackground') ||
        SETTINGS.get('useAvatarAsBackground')) && (
        <style>{`
                .wrapper {
                    --banner-url: url("${SETTINGS.get('useAvatarAsBackground') ? (preview ? previewAvatar : avatar) : (preview ? previewBanner : banner)}") !important;
                    ${SETTINGS.get('adjustBackgroundOpacity') ? `--banner-opacity: ${SETTINGS.get('backgroundOpacity')} !important;` : ''}
              ${SETTINGS.get('adjustBackgroundBlur') ? `--banner-blur: ${SETTINGS.get('backgroundBlur')}px !important;` : ''}
            --banner-radius: ${BANNER_RADIUS_MAP[SETTINGS.get('style')] ?? 12}px !important;
                }
            `}</style>
      )}
      {SETTINGS.get('widgetOpacity') !== 1 && (
        <style>{`.wrapper {
					--background-opacity: ${SETTINGS.get('widgetOpacity')} !important;
				}`}</style>
      )}
      {(SETTINGS.get('customInlineCSS') as string).trim().length > 0 && (
        <style>{SETTINGS.get('customInlineCSS') as string}</style>
      )}
      {SETTINGS.get('adjustLevelIconScale') && (
        <style>{`
                .wrapper .level svg.faceit-level {
                    transform: scale(${1 + (SETTINGS.get('levelIconScale') as number) / 100});
                    transform-origin: center center;
                }
            `}</style>
      )}
        {SETTINGS.get('adjustRankingIconScale') && (
        <style>{`
            .wrapper .flag {
              height: ${(0.7 * percentToFontScale(SETTINGS.get('rankingIconScale') as number)).toFixed(2)}rem !important;
              width: auto !important;
            }
          `}</style>
        )}
        {SETTINGS.get('adjustRankingFontSize') && (
        <style>{`
            .wrapper .widget .level .elo p.ranking {
              font-size: ${percentToFontScale(SETTINGS.get('rankingFontSize') as number)}em !important;
            }
          `}</style>
        )}
      {SETTINGS.get('adjustBannerFont') && (
        <style>{`
                .wrapper .widget,
                .wrapper .widget * {
                    font-family: ${BANNER_FONT_FAMILY_MAP[(SETTINGS.get('bannerFont') as string) || 'dm_sans'] || BANNER_FONT_FAMILY_MAP.dm_sans} !important;
                  }
                ${SETTINGS.get('adjustBannerFontWeightNickname') ? `.wrapper .widget .level .elo h2 { font-weight: ${percentToFontWeight(SETTINGS.get('bannerFontWeightNickname'))} !important; }` : ''}
                ${SETTINGS.get('adjustBannerFontWeightElo') ? `.wrapper .widget .level .elo p .elo-value { font-weight: ${percentToFontWeight(SETTINGS.get('bannerFontWeightElo'))} !important; }` : ''}
                ${SETTINGS.get('adjustBannerFontWeightEloSuffix') ? `.wrapper .widget .level .elo p .elo-suffix { font-weight: ${percentToFontWeight(SETTINGS.get('bannerFontWeightEloSuffix'))} !important; }` : ''}
                ${SETTINGS.get('adjustBannerFontWeightEloDiff') ? `.wrapper .widget .level .elo p .diff { font-weight: ${percentToFontWeight(SETTINGS.get('bannerFontWeightEloDiff'))} !important; }` : ''}
                ${SETTINGS.get('adjustBannerFontWeightWinsValue') ? `.wrapper .widget .matches .stat.green .stat-value { font-weight: ${percentToFontWeight(SETTINGS.get('bannerFontWeightWinsValue'))} !important; }` : ''}
                ${SETTINGS.get('adjustBannerFontWeightWinsLabel') ? `.wrapper .widget .matches .stat.green .stat-label { font-weight: ${percentToFontWeight(SETTINGS.get('bannerFontWeightWinsLabel'))} !important; }` : ''}
                ${SETTINGS.get('adjustBannerFontWeightLossesValue') ? `.wrapper .widget .matches .stat.red .stat-value { font-weight: ${percentToFontWeight(SETTINGS.get('bannerFontWeightLossesValue'))} !important; }` : ''}
                ${SETTINGS.get('adjustBannerFontWeightLossesLabel') ? `.wrapper .widget .matches .stat.red .stat-label { font-weight: ${percentToFontWeight(SETTINGS.get('bannerFontWeightLossesLabel'))} !important; }` : ''}
                ${SETTINGS.get('adjustBannerFontWeightStatistics') ? `.wrapper .widget .average .stat p { font-weight: ${percentToFontWeight(SETTINGS.get('bannerFontWeightStatistics'))} !important; }` : ''}
            ${SETTINGS.get('adjustBannerFontSizeNickname') ? `.wrapper .widget .level .elo h2 { font-size: ${percentToFontScale(SETTINGS.get('bannerFontSizeNickname') as number)}em !important; }` : ''}
            ${SETTINGS.get('adjustBannerFontSizeElo') ? `.wrapper .widget .level .elo p .elo-value { font-size: ${percentToFontScale(SETTINGS.get('bannerFontSizeElo') as number)}em !important; }` : ''}
            ${SETTINGS.get('adjustBannerFontSizeEloSuffix') ? `.wrapper .widget .level .elo p .elo-suffix { font-size: ${percentToFontScale(SETTINGS.get('bannerFontSizeEloSuffix') as number)}em !important; }` : ''}
            ${SETTINGS.get('adjustBannerFontSizeEloDiff') ? `.wrapper .widget .level .elo p .diff { font-size: ${percentToFontScale(SETTINGS.get('bannerFontSizeEloDiff') as number)}em !important; }` : ''}
            ${SETTINGS.get('adjustBannerFontSizeWinsValue') ? `.wrapper .widget .matches .stat.green .stat-value { font-size: ${percentToFontScale(SETTINGS.get('bannerFontSizeWinsValue') as number)}em !important; }` : ''}
            ${SETTINGS.get('adjustBannerFontSizeWinsLabel') ? `.wrapper .widget .matches .stat.green .stat-label { font-size: ${percentToFontScale(SETTINGS.get('bannerFontSizeWinsLabel') as number)}em !important; }` : ''}
            ${SETTINGS.get('adjustBannerFontSizeLossesValue') ? `.wrapper .widget .matches .stat.red .stat-value { font-size: ${percentToFontScale(SETTINGS.get('bannerFontSizeLossesValue') as number)}em !important; }` : ''}
            ${SETTINGS.get('adjustBannerFontSizeLossesLabel') ? `.wrapper .widget .matches .stat.red .stat-label { font-size: ${percentToFontScale(SETTINGS.get('bannerFontSizeLossesLabel') as number)}em !important; }` : ''}
            ${SETTINGS.get('adjustBannerFontSizeStatistics') ? `.wrapper .widget .average .stat p { font-size: ${percentToFontScale(SETTINGS.get('bannerFontSizeStatistics') as number)}em !important; }` : ''}
            `}</style>
      )}
          {SETTINGS.get('adjustEloSuffixSpacing') && SETTINGS.get('showEloSuffix') && (
            <style>{`
                .wrapper .widget .level .elo p .elo-suffix {
                margin-left: ${SETTINGS.get('eloSuffixSpacing')}px !important;
                }
            `}</style>
          )}
          {SETTINGS.get('adjustBannerShadow') && (
            <style>{`
                .wrapper .widget {
                box-shadow: 0 ${Math.round((SETTINGS.get('bannerShadowStrength') as number) / 4)}px ${Math.round((SETTINGS.get('bannerShadowStrength') as number) * 0.8)}px ${hexToRgba(SETTINGS.get('bannerShadowColor') as string, SETTINGS.get('bannerShadowOpacity') as number)} !important;
                }
            `}</style>
          )}
      <div
        className={`wrapper${compatibilityMode ? ' compatibility' : ''}`}
        style={
          {
            '--faceit-level': `var(--faceit-level-${currentEloDistribution[0]})`,
          } as CSSProperties
        }
      >
        <div
          className={`widget ${SETTINGS.get('useBannerAsBackground') || SETTINGS.get('useAvatarAsBackground') ? 'banner' : ''}`}
        >
          {isAnimatedStyle ? (
            <div
              className={'animated-deck'}
              style={
                animatedDeckHeight > 0
                  ? ({ minHeight: `${animatedDeckHeight}px` } as CSSProperties)
                  : undefined
              }
            >
              <div className={'animated-deck-measure'} ref={animatedMeasureRef}>
                {animatedCardOrder.map((entry) => (
                  <div
                    key={`animated-measure-${entry.key}`}
                    className={`animated-card ${entry.key}`}
                  >
                    {entry.key === 'header' && renderHeaderCard(true)}
                    {entry.key === 'stats' && renderStatsCard()}
                    {entry.key === 'matches' && renderMatchesCard()}
                  </div>
                ))}
              </div>
              {animatedCardOrder.length > 0 && (
                <div
                  key={`animated-card-${animatedCardOrder[animatedDeckIndex].key}-${animatedDeckIndex}`}
                  className={`animated-card ${animatedCardOrder[animatedDeckIndex].key} anim-${String(SETTINGS.get('animatedDeckAnimation') || 'fade').replace(/_/g, '-')}`}
                >
                  {animatedCardOrder[animatedDeckIndex].key === 'header' &&
                    renderHeaderCard(true)}
                  {animatedCardOrder[animatedDeckIndex].key === 'stats' &&
                    renderStatsCard()}
                  {animatedCardOrder[animatedDeckIndex].key === 'matches' &&
                    renderMatchesCard()}
                </div>
              )}
            </div>
          ) : (
            <>
              <div className={'player-stats'}>
                {renderHeaderCard(false)}
                <div className={'matches'}>
                  <div className={'stats'}>
                    <Statistic
                      color={'green'}
                      value={String(wins)}
                      text={translate('widget.wins')}
                    />
                    <Statistic
                      color={'red'}
                      value={String(losses)}
                      text={translate('widget.losses')}
                    />
                  </div>
                </div>
              </div>
              {SETTINGS.get('showStatistics') && (
                <div className={'average'}>
                  {stats.map((stat) => {
                    return (
                      <div className={'stat'} key={`default-stat-${stat}`}>
                        <p>{translate(`widget.${stat.toLowerCase()}`)}</p>
                        <p>
                          {getStat(stat) || <span className={'skeleton'}>???</span>}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
              {SETTINGS.get('showEloProgressBar') && (
                <div className={'progress-bar'}>
                  <div
                    className={'progress'}
                    style={{
                      width:
                        level === 10
                          ? '100%'
                          : `${((elo - (currentEloDistribution[1][1] as number)) / ((currentEloDistribution[1][2] as number) - (currentEloDistribution[1][1] as number))) * 100}%`,
                    }}
                  ></div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
