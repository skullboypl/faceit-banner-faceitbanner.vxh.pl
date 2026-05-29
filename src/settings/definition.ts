import { colorSchemes, styles } from '../../widget/src/styles/styles';
import { languages } from '../translations/translations';
import { SettingDefinition } from './manager';

const HEX_REGEXP = /^[0-9a-fA-F]{3,8}$/;
const BANNER_FONT_OPTIONS = [
  'dm_sans',
  'arial',
  'comic_sans_ms',
  'courier_new',
  'garamond',
  'georgia',
  'helvetica',
  'impact',
  'inter',
  'lucida_sans',
  'merriweather',
  'montserrat',
  'open_sans',
  'oswald',
  'palatino_linotype',
  'playfair_display',
  'poppins',
  'roboto',
  'segoe_ui',
  'tahoma',
  'times_new_roman',
  'trebuchet_ms',
  'verdana',
  'kick_font',
];

export const SETTINGS_DEFINITIONS = {
  widgetLanguage: {
    type: 'string_undefined',
    defaultValue: undefined,
    options: [...languages.map((language) => language.id), undefined],
    query: ['lang'],
  },
  playerId: {
    type: 'string',
    defaultValue: undefined,
    query: ['player_id'],
  },
  autoWidth: {
    type: 'boolean',
    defaultValue: true,
    defaultWidgetValue: false,
    query: ['auto_width'],
  },
  onlyOfficialMatchesCount: {
    type: 'boolean',
    defaultValue: true,
    query: ['only_official'],
  },
  showRanking: {
    type: 'ranking_state',
    defaultValue: 2,
    defaultWidgetValue: 0,
    query: ['ranking'],
  },
  showEloDiff: {
    type: 'boolean',
    defaultValue: true,
    query: ['diff'],
  },
  showIcons: {
    type: 'boolean',
    defaultValue: false,
    defaultWidgetValue: false,
    query: ['icons'],
  },
  showLevelIcon: {
    type: 'boolean',
    defaultValue: true,
    query: ['level_icon'],
  },
  showUsername: {
    type: 'boolean',
    defaultValue: true,
    query: ['name'],
  },
  showVerifiedBadge: {
    type: 'boolean',
    defaultValue: false,
    defaultWidgetValue: false,
    query: ['verified_badge'],
  },
  showEloSuffix: {
    type: 'boolean',
    defaultValue: true,
    query: ['suffix'],
  },
  showStatistics: {
    type: 'boolean',
    defaultValue: true,
    defaultWidgetValue: false,
    query: ['show_stats', 'avg'],
  },
  showEloProgressBar: {
    type: 'boolean',
    defaultValue: true,
    defaultWidgetValue: false,
    query: ['progress', 'eloBar'],
  },
  useBannerAsBackground: {
    type: 'boolean',
    defaultValue: true,
    defaultWidgetValue: false,
    query: ['banner'],
  },
  useAvatarAsBackground: {
    type: 'boolean',
    defaultValue: false,
    defaultWidgetValue: false,
    query: ['avatar'],
  },
  adjustBackgroundOpacity: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bg_opacity'],
  },
  adjustBackgroundBlur: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bg_blur'],
  },
  adjustBannerShadow: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_banner_shadow'],
  },
  adjustEloSuffixSpacing: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_elo_suffix_spacing'],
  },
  adjustLevelIconScale: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_level_icon_scale'],
  },
  adjustRankingIconScale: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_ranking_icon_scale'],
  },
  adjustRankingFontSize: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_ranking_font_size'],
  },
  adjustBannerFont: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_banner_font'],
  },
  backgroundOpacity: {
    type: 'number',
    defaultValue: 0.15,
    min: 0,
    max: 1,
    query: ['banner_opacity'],
    requirements: [
      {
        setting: 'adjustBackgroundOpacity',
        value: true,
      },
    ],
  },
  backgroundBlur: {
    type: 'number',
    defaultValue: 2,
    min: 0,
    max: 20,
    query: ['banner_blur'],
    requirements: [
      {
        setting: 'adjustBackgroundBlur',
        value: true,
      },
    ],
  },
  bannerShadowColor: {
    type: 'string',
    defaultValue: '000000',
    regex: HEX_REGEXP,
    query: ['banner_shadow_color'],
    requirements: [
      {
        setting: 'adjustBannerShadow',
        value: true,
      },
    ],
  },
  bannerShadowOpacity: {
    type: 'number',
    defaultValue: 0.35,
    min: 0,
    max: 1,
    query: ['banner_shadow_opacity'],
    requirements: [
      {
        setting: 'adjustBannerShadow',
        value: true,
      },
    ],
  },
  bannerShadowStrength: {
    type: 'number',
    defaultValue: 35,
    min: 0,
    max: 100,
    query: ['banner_shadow_strength'],
    requirements: [
      {
        setting: 'adjustBannerShadow',
        value: true,
      },
    ],
  },
  eloSuffixSpacing: {
    type: 'number',
    defaultValue: 4,
    min: 0,
    max: 20,
    query: ['elo_suffix_spacing'],
    requirements: [
      {
        setting: 'adjustEloSuffixSpacing',
        value: true,
      },
    ],
  },
  levelIconScale: {
    type: 'number',
    defaultValue: 0,
    min: -50,
    max: 50,
    query: ['level_icon_scale'],
    requirements: [
      {
        setting: 'adjustLevelIconScale',
        value: true,
      },
    ],
  },
  rankingIconScale: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['ranking_icon_scale'],
    requirements: [
      {
        setting: 'adjustRankingIconScale',
        value: true,
      },
    ],
  },
  rankingFontSize: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['ranking_font_size'],
    requirements: [
      {
        setting: 'adjustRankingFontSize',
        value: true,
      },
    ],
  },
  bannerFont: {
    type: 'string',
    defaultValue: 'dm_sans',
    options: BANNER_FONT_OPTIONS,
    query: ['banner_font'],
    requirements: [
      {
        setting: 'adjustBannerFont',
        value: true,
      },
    ],
  },
  adjustBannerFontWeightNickname: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfw_nick'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontWeightNickname: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfw_nick'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontWeightNickname', value: true },
    ],
  },
  adjustBannerFontSizeNickname: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfs_nick'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontSizeNickname: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfs_nick'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontSizeNickname', value: true },
    ],
  },
  adjustBannerFontWeightElo: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfw_elo'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontWeightElo: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfw_elo'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontWeightElo', value: true },
    ],
  },
  adjustBannerFontSizeElo: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfs_elo'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontSizeElo: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfs_elo'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontSizeElo', value: true },
    ],
  },
  adjustBannerFontWeightEloSuffix: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfw_elo_suffix'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontWeightEloSuffix: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfw_elo_suffix'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontWeightEloSuffix', value: true },
    ],
  },
  adjustBannerFontSizeEloSuffix: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfs_elo_suffix'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontSizeEloSuffix: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfs_elo_suffix'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontSizeEloSuffix', value: true },
    ],
  },
  adjustBannerFontWeightEloDiff: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfw_elo_diff'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontWeightEloDiff: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfw_elo_diff'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontWeightEloDiff', value: true },
    ],
  },
  adjustBannerFontSizeEloDiff: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfs_elo_diff'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontSizeEloDiff: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfs_elo_diff'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontSizeEloDiff', value: true },
    ],
  },
  adjustBannerFontWeightWinsValue: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfw_wins_value'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontWeightWinsValue: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfw_wins_value'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontWeightWinsValue', value: true },
    ],
  },
  adjustBannerFontSizeWinsValue: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfs_wins_value'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontSizeWinsValue: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfs_wins_value'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontSizeWinsValue', value: true },
    ],
  },
  adjustBannerFontWeightWinsLabel: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfw_wins_label'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontWeightWinsLabel: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfw_wins_label'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontWeightWinsLabel', value: true },
    ],
  },
  adjustBannerFontSizeWinsLabel: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfs_wins_label'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontSizeWinsLabel: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfs_wins_label'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontSizeWinsLabel', value: true },
    ],
  },
  adjustBannerFontWeightLossesValue: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfw_losses_value'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontWeightLossesValue: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfw_losses_value'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontWeightLossesValue', value: true },
    ],
  },
  adjustBannerFontSizeLossesValue: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfs_losses_value'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontSizeLossesValue: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfs_losses_value'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontSizeLossesValue', value: true },
    ],
  },
  adjustBannerFontWeightLossesLabel: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfw_losses_label'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontWeightLossesLabel: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfw_losses_label'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontWeightLossesLabel', value: true },
    ],
  },
  adjustBannerFontSizeLossesLabel: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfs_losses_label'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontSizeLossesLabel: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfs_losses_label'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontSizeLossesLabel', value: true },
    ],
  },
  adjustBannerFontWeightStatistics: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfw_stats'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontWeightStatistics: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfw_stats'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontWeightStatistics', value: true },
    ],
  },
  adjustBannerFontSizeStatistics: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_bfs_stats'],
    requirements: [{ setting: 'adjustBannerFont', value: true }],
  },
  bannerFontSizeStatistics: {
    type: 'number',
    defaultValue: 50,
    min: 0,
    max: 200,
    query: ['bfs_stats'],
    requirements: [
      { setting: 'adjustBannerFont', value: true },
      { setting: 'adjustBannerFontSizeStatistics', value: true },
    ],
  },
  refreshInterval: {
    type: 'number',
    defaultValue: 60,
    min: 10,
    max: 120,
    query: ['refresh'],
  },
  colorScheme: {
    type: 'string',
    defaultValue: 'faceit',
    options: colorSchemes,
    query: ['scheme', 'color_scheme'],
  },
  style: {
    type: 'string',
    defaultValue: 'rounded',
    options: styles.map((style) => style.id),
    query: ['style'],
  },
  animatedDeckAnimation: {
    type: 'string',
    defaultValue: 'fade',
    options: ['fade', 'slide_up', 'zoom'],
    query: ['anim_type'],
    requirements: [
      {
        setting: 'style',
        value: 'animated',
      },
    ],
  },
  animatedDeckShowHeader: {
    type: 'boolean',
    defaultValue: true,
    query: ['anim_show_header'],
    requirements: [
      {
        setting: 'style',
        value: 'animated',
      },
    ],
  },
  animatedDeckShowStats: {
    type: 'boolean',
    defaultValue: true,
    query: ['anim_show_stats'],
    requirements: [
      {
        setting: 'style',
        value: 'animated',
      },
    ],
  },
  animatedDeckShowMatches: {
    type: 'boolean',
    defaultValue: true,
    query: ['anim_show_matches'],
    requirements: [
      {
        setting: 'style',
        value: 'animated',
      },
    ],
  },
  animatedDeckOrderHeader: {
    type: 'number',
    defaultValue: 1,
    min: 1,
    max: 3,
    query: ['anim_order_header'],
    requirements: [
      {
        setting: 'style',
        value: 'animated',
      },
    ],
  },
  animatedDeckOrderStats: {
    type: 'number',
    defaultValue: 2,
    min: 1,
    max: 3,
    query: ['anim_order_stats'],
    requirements: [
      {
        setting: 'style',
        value: 'animated',
      },
    ],
  },
  animatedDeckOrderMatches: {
    type: 'number',
    defaultValue: 3,
    min: 1,
    max: 3,
    query: ['anim_order_matches'],
    requirements: [
      {
        setting: 'style',
        value: 'animated',
      },
    ],
  },
  customBorderColor1: {
    type: 'string',
    defaultValue: '595959',
    regex: HEX_REGEXP,
    query: ['border1'],
    requirements: [
      {
        setting: 'colorScheme',
        value: 'custom',
      },
    ],
  },
  customInlineCSS: {
    type: 'string',
    defaultValue: '',
    query: ['inline_css_b64', 'inline_css'],
  },
  customBorderColor1Opacity: {
    type: 'number',
    defaultValue: 1,
    min: 0,
    max: 1,
    query: ['border1_opacity'],
    requirements: [
      {
        setting: 'colorScheme',
        value: 'custom',
      },
    ],
  },
  customBorderColor2: {
    type: 'string',
    defaultValue: '8d8d8d',
    regex: HEX_REGEXP,
    query: ['border2'],
    requirements: [
      {
        setting: 'colorScheme',
        value: 'custom',
      },
    ],
  },
  customBorderColor2Opacity: {
    type: 'number',
    defaultValue: 1,
    min: 0,
    max: 1,
    query: ['border2_opacity'],
    requirements: [
      {
        setting: 'colorScheme',
        value: 'custom',
      },
    ],
  },
  adjustBorderWidth: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_border_width', 'adjustBorderWidth', 'adjust_bw'],
    requirements: [
      {
        setting: 'colorScheme',
        value: 'custom',
      },
    ],
  },
  borderWidth: {
    type: 'number',
    defaultValue: 1,
    min: 0,
    max: 12,
    query: ['border_width', 'width', 'bw'],
    requirements: [
      {
        setting: 'colorScheme',
        value: 'custom',
      },
      {
        setting: 'adjustBorderWidth',
        value: true,
      },
    ],
  },
  adjustStatisticsSeparator: {
    type: 'boolean',
    defaultValue: false,
    query: ['adjust_stats_separator'],
    requirements: [
      {
        setting: 'colorScheme',
        value: 'custom',
      },
    ],
  },
  customStatisticsSeparatorColor: {
    type: 'string',
    defaultValue: '595959',
    regex: HEX_REGEXP,
    query: ['stats_separator_color'],
    requirements: [
      {
        setting: 'colorScheme',
        value: 'custom',
      },
      {
        setting: 'adjustStatisticsSeparator',
        value: true,
      },
    ],
  },
  customStatisticsSeparatorOpacity: {
    type: 'number',
    defaultValue: 1,
    min: 0,
    max: 1,
    query: ['stats_separator_opacity'],
    requirements: [
      {
        setting: 'colorScheme',
        value: 'custom',
      },
      {
        setting: 'adjustStatisticsSeparator',
        value: true,
      },
    ],
  },
  statisticsSeparatorWidth: {
    type: 'number',
    defaultValue: 1,
    min: 0,
    max: 12,
    query: ['stats_separator_width'],
    requirements: [
      {
        setting: 'colorScheme',
        value: 'custom',
      },
      {
        setting: 'adjustStatisticsSeparator',
        value: true,
      },
    ],
  },
  customTextColor: {
    type: 'string',
    defaultValue: 'ffffff',
    regex: HEX_REGEXP,
    query: ['color'],
    requirements: [
      {
        setting: 'colorScheme',
        value: 'custom',
      },
    ],
  },
  customBackgroundColor: {
    type: 'string',
    defaultValue: '121212',
    regex: HEX_REGEXP,
    query: ['bg_color', 'bg-color'],
    requirements: [
      {
        setting: 'colorScheme',
        value: 'custom',
      },
    ],
  },
  statSlot1: {
    type: 'statistic_type',
    defaultValue: 'KILLS',
  },
  statSlot2: {
    type: 'statistic_type',
    defaultValue: 'KD',
  },
  statSlot3: {
    type: 'statistic_type',
    defaultValue: 'HSPERCENT',
  },
  statSlot4: {
    type: 'statistic_type',
    defaultValue: 'WINRATIO',
  },
  saveSession: {
    type: 'boolean',
    defaultValue: true,
    query: ['save_session'],
  },
  averageStatsMatchCount: {
    type: 'number',
    defaultValue: 30,
    query: ['avg_matches'],
  },
  widgetOpacity: {
    type: 'number',
    defaultValue: 1,
    min: 0,
    max: 1,
    query: ['opacity'],
  },
  customCSS: {
    type: 'string_undefined',
    defaultValue: undefined,
    query: ['css'],
  },
} satisfies Record<string, SettingDefinition>;
