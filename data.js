// =========================================================================
// MYTHEOGONICA // SECTOR & MECHA MASTER DATABASE (3-TIER HIERARCHY)
// =========================================================================
const SECTORS_DATA = [
  {
    id: "sector-greek",
    mythBadge: "GREEK MYTH",
    btnLabel: "ギリシャ",
    sectorTag: "SECTOR 01 // MEDITERRANEAN",
    sectorName: "ギリシャ",
    lat: 38.0,
    lon: 23.7,
    subFactions: [
      {
        factionName: "オリュンポス系",
        factionCode: "DIV-01 // OLYMPOS",
        mechaList: [
          {
            name: "アテナ [PALLAS ATHENA]",
            image: "athena.png",
            specs: [
              { label: "全高 / 重量", value: "14.2m / 23.6t" },
              { label: "動力", value: "精神波インターフェース型神経炉" },
              { label: "装甲材", value: "オリュンポス合金（潤愛甲）" },
              { label: "主兵装", value: "超長槍【ドーリュス】/ アイギス・シールド" }
            ],
            doctrineTitle: "運用ドクトリン: ファランクス陣形",
            doctrineText: "単騎での格闘戦を主とせず、盾を連結した多層精神波フィールドによる集団防壁を形成。水上ホバー機動と長槍斉射による圧倒的制圧を行う。"
          }
        ]
      }
    ],
    story: {
      tag: "EXCAVATION LOG #01-A",
      title: "エーゲ海底の鋼鉄処女",
      text: "エーゲ海溝3,000メートルの泥中より引き揚げられたオリュンポス合金の装甲は、数千年の塩害を受けながらも鏡面のような白銀を保っていた。パイロット候補生が搭乗した瞬間、神経炉から放たれた精神波パルスは観測網全域を青く染め上げた。"
    }
  },
  {
    id: "sector-norse",
    mythBadge: "NORSE MYTH",
    btnLabel: "北欧",
    sectorTag: "SECTOR 02 // SCANDINAVIA",
    sectorName: "北欧",
    lat: 60.0,
    lon: 15.0,
    subFactions: [
      {
        factionName: "アース神族 (AESIR)",
        factionCode: "DIV-02-A // AESIR CORPS",
        mechaList: [
          {
            name: "テュール [TÝR]",
            image: "tyr.png",
            specs: [
              { label: "分類 / 神格", value: "アース神族 基準機・万能型 / 正義・契約・勇気・勝利の神" },
              { label: "全高 / 重量", value: "14.2m / 38.7t" },
              { label: "動力", value: "精神波・生体エネルギー増幅炉（北欧系標準）" },
              { label: "構造特徴", value: "高剛性フレーム / 人工筋肉 / 左腕封止装甲" },
              { label: "武装構成", value: "戦術剣 / ダークシールド / 投擲ナイフ（複数）" },
              { label: "特殊機構", value: "バーサーカーモード（装甲分割展開・人工筋肉膨張）" }
            ],
            doctrineTitle: "運用ドクトリン: 隻腕攻防一体・臨界戦技",
            doctrineText: "かつてフェンリル拘束の代償として左腕を肘より先で失うも、強化された下半身と再配線された胴体制御により極めて高い機動性とバランスを維持。ダークシールドによる受け流しと戦術剣の一撃必殺、危機時のバーサーカー化で戦況を打開する。"
          }
        ]
      },
      {
        factionName: "ヴァン神族 (VANIR)",
        factionCode: "DIV-02-B // VANIR CORPS",
        mechaList: [
          {
            name: "フレイ [VANIR CLASS]",
            image: "freyr.png",
            specs: [
              { label: "全高 / 重量", value: "14.3m / 41.7t" },
              { label: "動力", value: "北欧系人工筋肉弾性素子" },
              { label: "主兵装", value: "自律戦闘剣《スキーズブラズニル》" },
              { label: "特殊機構", value: "バーサーカーモード（出力420%解放）" }
            ],
            doctrineTitle: "運用ドクトリン: 突進・強襲",
            doctrineText: "「豊穣は力により守られる。力は生命に戻る。」装甲展開シーケンスにより過熱を強制排熱し、精神波同調で機動・加速力を極限まで高める。"
          }
        ]
      }
    ],
    story: {
      tag: "EXCAVATION LOG #02-B",
      title: "永久凍土の誓約と隻腕",
      text: "スカンディナヴィアの氷壁深くに埋もれていたアース神族・ヴァン神族の機体群。左腕を自ら封じ、ルーン刻印の盾を構えた巨躯は、数千年を経た今もなお誓約の熱量を炉心に宿し、再起動の時を静かに待っていた。"
    }
  },
  {
    id: "sector-taoism",
    mythBadge: "TAOISM MYTH",
    btnLabel: "道教",
    sectorTag: "SECTOR 03 // EAST ASIA",
    sectorName: "道教",
    lat: 35.8,
    lon: 94.0,
    subFactions: [
      {
        factionName: "崑崙系",
        factionCode: "DIV-03 // KUNLUN",
        mechaList: [
          {
            name: "広成子 [こうせいし]",
            image: "kouseishi.png",
            specs: [
              { label: "全高 / 重量", value: "14.1m / 18.4t" },
              { label: "動力", value: "霊気炉「乾元」" },
              { label: "主要法宝", value: "番天印（推定重量480t以上 / 質量制御）" },
              { label: "運用思想", value: "最小の動きで最大の効果を生む盤面制圧" }
            ],
            doctrineTitle: "運用ドクトリン: 道教法宝制圧",
            doctrineText: "「印は天の意を刻み、道は無形にして万象を制す。」機体装甲は最小限に留め、霊気隔壁と補助法宝ユニットによる空間固定・質量圧壊を行う。"
          }
        ]
      }
    ],
    story: {
      tag: "EXCAVATION LOG #03-C",
      title: "天を穿つ金印の質量",
      text: "崑崙山の地下鍾乳洞で発見された浮遊コア。周囲の重力定数が局所的に狂う現象が観測され、小型印章型の法宝から放たれる質量制御フィールドは一帯の山嶺を軽々と押し潰した。"
    }
  },
  {
    id: "sector-mesopotamia",
    mythBadge: "MESOPOTAMIA MYTH",
    btnLabel: "メソポタミア",
    sectorTag: "SECTOR 04 // MESOPOTAMIA",
    sectorName: "メソポタミア",
    lat: 33.3,
    lon: 44.3,
    subFactions: [
      {
        factionName: "アヌンナキ神権序列",
        factionCode: "DIV-04 // ANUNNAKI",
        mechaList: [
          {
            name: "エンリル [ENLIL]",
            image: "enlil.png",
            specs: [
              { label: "全高 / 重量", value: "14.0m / 不明（重戦闘型）" },
              { label: "装甲構造", value: "積層装甲構造（大判蛇腹状装甲）" },
              { label: "主武装", value: "シックルソード（鎌剣） / 肩部風圧兵装" },
              { label: "脚部機構", value: "踵部大型単輪タイヤ ＋ くるぶし鎌" }
            ],
            doctrineTitle: "運用ドクトリン: 歩く要塞・戦艦型ドクトリン",
            doctrineText: "鈍重ながら圧倒的な装甲厚と肩部風圧砲で正面を維持・粉砕。接近を試みた敵をシックルソードと踵の鎌で引き裂く。"
          }
        ]
      }
    ],
    story: {
      tag: "EXCAVATION LOG #04-D",
      title: "砂塵の重嵐",
      text: "チグリス・ユーフラテス川下流域のジグラット基礎部から現れた巨体。タイヤ機構が大地を踏み締めると同時に、肩部の風圧砲から発せられた爆風が砂漠を焦土へと変貌させた。"
    }
  },
  {
    id: "sector-egypt",
    mythBadge: "EGYPT MYTH",
    btnLabel: "エジプト",
    sectorTag: "SECTOR 05 // NILE BASIN",
    sectorName: "エジプト",
    lat: 26.8,
    lon: 30.8,
    subFactions: [
      {
        factionName: "ヘリオポリス",
        factionCode: "DIV-05 // ENNEAD",
        mechaList: [
          {
            name: "ホルス [HORUS]",
            image: "horus.png",
            specs: [
              { label: "全高 / 分類", value: "14.0m / 天空戦・高機動型" },
              { label: "主武装", value: "ホルスの槍 / 羽型ハンド（エネルギー刃）" },
              { label: "特殊形態", value: "飛行形態（ホルス・フライト）" },
              { label: "脚部", value: "逆関節脚（跳躍・高把持力爪）" }
            ],
            doctrineTitle: "運用ドクトリン: 王権の守護者・制空支配",
            doctrineText: "ウラエウス（聖蛇）による精神波増幅と超高感度センサーを用い、上空からの精密急降下攻撃で敵の指揮中枢を壊滅させる。"
          }
        ]
      }
    ],
    story: {
      tag: "EXCAVATION LOG #05-E",
      title: "黄金の天翔ける眼",
      text: "ピラミッド地下の玄室で、反り上がった姿勢のまま直立していた隼頭の神代機。胸部の聖蛇センサーが起動した瞬間、眩いラピスラズリの光刃が翼を広げ、音速を超えて大気圏を切り裂いた。"
    }
  },
  {
    id: "sector-india",
    mythBadge: "VEDIC MYTH",
    btnLabel: "インド",
    sectorTag: "SECTOR 06 // INDUS VALLEY",
    sectorName: "インド",
    lat: 20.5,
    lon: 78.9,
    subFactions: [
      {
        factionName: "ヴェーダ",
        factionCode: "DIV-06 // LOKAPALA",
        mechaList: [
          {
            name: "ヴァーユ [VAYU]",
            image: "vayu.png",
            specs: [
              { label: "全高 / 分類", value: "14.0m / 天空神・風神・気神" },
              { label: "主能力", value: "風の運用・気流操作・バリア展開" },
              { label: "共通機構", value: "丸型ショルダーバリア（高出力エネルギー障壁）" },
              { label: "固有装備", value: "風袋（ふうたい / 圧縮気流タンク）" }
            ],
            doctrineTitle: "運用ドクトリン: プラーナ循環・三次元噴射",
            doctrineText: "装甲を持たない腹部からプラーナを循環・放出し、風袋による三次元噴射と高圧衝撃波で戦場全域の気流を支配する。"
          }
        ]
      }
    ],
    story: {
      tag: "EXCAVATION LOG #06-F",
      title: "呼吸する白亜の霊風",
      text: "装甲を持たない腹部から絶え間なくエネルギーを排吸し続ける白磁の機体。背部の球体風袋から解き放たれた気流の渦は、戦場全体の空気を奪い去り、触れた敵機を分子レベルで風化させた。"
    }
  },
  {
    id: "sector-mesoamerica",
    mythBadge: "MESOAMERICA",
    btnLabel: "メソアメリカ",
    sectorTag: "SECTOR 07 // MESOAMERICA",
    sectorName: "メソアメリカ",
    lat: 19.4,
    lon: -99.1,
    subFactions: [
      {
        factionName: "創造神格系",
        factionCode: "DIV-07 // CREATOR CLASS",
        mechaList: [
          {
            name: "ケツァルコアルト [QUETZALCOATL]",
            image: "quetzalcoatl.png",
            specs: [
              { label: "全高 (頭頂部)", value: "14.0m / 重量: 不明" },
              { label: "機体方式", value: "精神波同期式コアドライブ" },
              { label: "群体ユニット", value: "ユーマ（羽の子 / スカイフィッシュ型小型群体）" },
              { label: "主能力", value: "風圧カッター / 気流竜巻 / 再生フィールド" }
            ],
            doctrineTitle: "運用ドクトリン: 循環・群体攪乱・再生",
            doctrineText: "破壊よりも秩序の再構築を重視。自らの羽根から数十機の小型群体「ユーマ」を生成・放出し、風の循環で包み込んで敵を削り制圧する。"
          }
        ]
      }
    ],
    story: {
      tag: "EXCAVATION LOG #07-G",
      title: "密林の羽毛蛇と群れ飛ぶ子ら",
      text: "熱帯雨林の奥底、緑青に覆われた蛇型巨神。その翼から無数に剥離した小型飛翔体『ユーマ』の群れは、風を喰らい自己修復を繰り返しながら、侵入者を跡形もなく解体していった。"
    }
  },
  {
    id: "sector-japan",
    mythBadge: "SHINTO MYTH",
    btnLabel: "日本",
    sectorTag: "SECTOR 08 // FAR EAST ARCHIPELAGO",
    sectorName: "日本",
    lat: 35.0,
    lon: 135.7,
    subFactions: [
      {
        factionName: "天津神系",
        factionCode: "DIV-08 // KOTOAMATSUKAMI",
        mechaList: [
          {
            name: "イザナギ [IZANAGI]",
            image: "izanagi.png",
            specs: [
              { label: "分類 / 全高", value: "日本系 基準機 / 18.2m" },
              { label: "重量", value: "63.8t" },
              { label: "動力 / 操縦", value: "タマノオロチ式 可変精神波炉 / ヤオヨロズ式 精神感応操縦" },
              { label: "構造特徴", value: "貫頭衣型 前面一枚装甲 ＋ 背面素体露出 / 注連縄状閉ループ動力パイプ" },
              { label: "主兵装", value: "直刀【アメノムラクモノツルギ】/ 結界展開" }
            ],
            doctrineTitle: "運用ドクトリン: 創世結界・直刀制圧",
            doctrineText: "日本の創世神の名を冠する最初の基準機。胸部の勾玉コアから注連縄状の閉ループ多層パイプを通じて全身へ精神波動を循環。反りを持たない完全直刀による精密斬撃と、広域結界展開による空間掌握を得意とする。"
          }
        ]
      }
    ],
    story: {
      tag: "EXCAVATION LOG #08-H",
      title: "原初の白磁一枚甲と注連縄パイプ",
      text: "淡路島深層岩戸より発掘された日ノ本の創世基準機体。貫頭衣を模した白磁の前面一枚装甲と、背面素体に剥き出しとなった注連縄状の多層パイプから脈動する霊力パルスは、数千年の沈黙を破り今なお稼働可能な状態を保っていた。"
    }
  }
];
