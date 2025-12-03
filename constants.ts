import { DaySchedule } from './types';

export const INITIAL_ITINERARY: DaySchedule[] = [
  {
    id: 'day1',
    date: '2026-02-13',
    dayOfWeek: '週五',
    title: '抵達山陰・皆生溫泉',
    activities: [
      { id: 'd1-1', time: '16:50', description: '抵達米子機場 (YGJ)', location: '米子鬼太郎空港', note: '出關後尋找計程車招呼站' },
      { id: 'd1-2', time: '17:30', description: '計程車直達皆生溫泉', location: '皆生温泉', note: '車程約 20 分鐘' },
      { id: 'd1-3', time: '18:00', description: '入住飯店', location: '皆生温泉 華水亭', note: '或「游月」。確認晚餐時間。' },
      { id: 'd1-4', time: '19:00', description: '晚餐：螃蟹會席料理', note: '盡情享受松葉蟹！' },
    ]
  },
  {
    id: 'day2',
    date: '2026-02-14',
    dayOfWeek: '週六',
    title: '鳥取文化與美食',
    activities: [
      { id: 'd2-1', time: '09:30', description: '出發前往鳥取', location: '米子駅', note: '搭乘 JR 超級松風號' },
      { id: 'd2-2', time: '11:30', description: '午餐：賀露港海鮮市場', location: '鳥取港海鮮市場 かろいち', note: '新鮮海產直送' },
      { id: 'd2-3', time: '13:30', description: '渡邊美術館', location: '渡辺美術館', note: '欣賞豐富的武士盔甲收藏' },
      { id: 'd2-4', time: '15:30', description: '鳥取城跡 / 仁風閣', location: '仁風閣', note: '散步感受歷史氛圍' },
      { id: 'd2-5', time: '18:30', description: '晚餐：炭火燒肉 福ふく', location: '炭火焼肉 福ふく', note: '品嚐頂級鳥取和牛' },
      { id: 'd2-6', time: '20:30', description: '入住飯店', location: 'Green Hotel Morris Tottori', note: '鳥取站前，交通方便' },
    ]
  },
  {
    id: 'day3',
    date: '2026-02-15',
    dayOfWeek: '週日',
    title: '鳥取沙丘自然體驗',
    activities: [
      { id: 'd3-1', time: '09:30', description: '前往鳥取沙丘', location: '鳥取砂丘', note: '欣賞壯觀景色，可騎駱駝' },
      { id: 'd3-2', time: '12:00', description: '午餐 (沙丘周邊)', note: '簡單用餐' },
      { id: 'd3-3', time: '13:00', description: '多鯰池皮艇體驗', location: '多鯰ヶ池', note: '需注意保暖，輕鬆划船' },
      { id: 'd3-4', time: '16:00', description: '返回飯店休息', location: 'Green Hotel Morris Tottori', note: '稍作休息' },
      { id: 'd3-5', time: '18:00', description: '晚餐：自由覓食', note: '探索鳥取站前商店街' },
    ]
  },
  {
    id: 'day4',
    date: '2026-02-16',
    dayOfWeek: '週一 (除夕)',
    title: '移動至神戶・有馬溫泉圍爐',
    activities: [
      { id: 'd4-1', time: '09:30', description: '退房，前往神戶', location: '鳥取駅', note: '搭乘 JR 超級白兔號往三宮' },
      { id: 'd4-2', time: '12:30', description: '抵達三宮 / 寄放行李 / 午餐', location: '三ノ宮駅', note: '享用神戶洋食' },
      { id: 'd4-3', time: '14:30', description: '北野異人館散步', location: '北野異人館街', note: '感受異國風情' },
      { id: 'd4-4', time: '16:00', description: '前往有馬溫泉', location: '有馬温泉駅', note: '轉乘巴士或電車' },
      { id: 'd4-5', time: '18:30', description: '除夕圍爐晚宴', location: '有馬グランドホテル', note: '或兵衛向陽閣。神戶牛懷石料理。' },
    ]
  },
  {
    id: 'day5',
    date: '2026-02-17',
    dayOfWeek: '週二',
    title: '返程與購物',
    activities: [
      { id: 'd5-1', time: '09:00', description: '早餐時光', note: '飯店精緻日式早餐' },
      { id: 'd5-2', time: '10:00', description: '下山返回三宮', location: '三ノ宮駅', note: '購買伴手禮' },
      { id: 'd5-3', time: '11:00', description: 'PortLiner 轉海上高速船', location: '神戸空港海上アクセスターミナル', note: '前往關西機場最快路徑' },
      { id: 'd5-4', time: '11:45', description: '抵達關西機場', location: '関西国際空港', note: '辦理登機與最後購物' },
      { id: 'd5-5', time: '14:50', description: '起飛返台', note: '平安回家' },
    ]
  }
];