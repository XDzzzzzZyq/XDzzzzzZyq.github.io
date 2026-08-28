/**
 * Language-neutral work metadata for the /design/ area.
 * Titles, summaries and body copy live in src/content/design/<lang>.json,
 * keyed by slug, the same way the research area keeps its dictionaries.
 */
export type WorkSection = "motion" | "graphic" | "tools";

export type WorkStat = {
  /** Key into the `stats` labels of the design dictionary. */
  key: string;
  value: string;
};

export type WorkLink = {
  /** Key into the per-work `links` labels of the design dictionary. */
  key: string;
  href: string;
};

export type WorkVideo = {
  /** Bilibili ids for the embedded player; only video works have them. */
  bvid: string;
  cid: string;
};

export type WorkItem = {
  slug: string;
  section: WorkSection;
  /** Publish date, or a range for series entries. */
  date: string;
  featured: boolean;
  cover: string;
  images: string[];
  stats: WorkStat[];
  links: WorkLink[];
  video?: WorkVideo;
};

export const sectionIds: WorkSection[] = ["motion", "graphic", "tools"];

export const sectionIndex: Record<WorkSection, string> = {
  motion: "01",
  graphic: "02",
  tools: "03",
};

export const works: WorkItem[] = [
  {
    slug: "sirius-heart",
    section: "motion",
    date: "2024-12-27",
    featured: true,
    cover: "/design/assets/sirius-heart/01.webp",
    images: [
      "/design/assets/sirius-heart/01.webp"
    ],
    stats: [
      {
        key: "play",
        value: "315,766"
      },
      {
        key: "length",
        value: "10:14"
      }
    ],
    links: [
      {
        key: "makingOf",
        href: "https://www.bilibili.com/video/BV1SMwUeUEYL/"
      },
      {
        key: "bilibili",
        href: "https://www.bilibili.com/video/BV1EiCYY6Ec4/"
      }
    ],
    video: {
      bvid: "BV1EiCYY6Ec4",
      cid: "27528399254"
    }
  },
  {
    slug: "irradiate",
    section: "motion",
    date: "2023-07-23",
    featured: true,
    cover: "/design/assets/irradiate/01.webp",
    images: [
      "/design/assets/irradiate/01.webp"
    ],
    stats: [
      {
        key: "play",
        value: "81,479"
      },
      {
        key: "length",
        value: "0:29"
      }
    ],
    links: [
      {
        key: "bilibili",
        href: "https://www.bilibili.com/video/BV1PX4y1n7rv/"
      }
    ],
    video: {
      bvid: "BV1PX4y1n7rv",
      cid: "1206706338"
    }
  },
  {
    slug: "getcha",
    section: "motion",
    date: "2021-09-21",
    featured: true,
    cover: "/design/assets/getcha/01.webp",
    images: [
      "/design/assets/getcha/01.webp"
    ],
    stats: [
      {
        key: "play",
        value: "266,669"
      },
      {
        key: "length",
        value: "3:53"
      }
    ],
    links: [
      {
        key: "bilibili",
        href: "https://www.bilibili.com/video/BV1bh411p79w/"
      }
    ],
    video: {
      bvid: "BV1bh411p79w",
      cid: "411863353"
    }
  },
  {
    slug: "power-still",
    section: "motion",
    date: "2021-12-17",
    featured: true,
    cover: "/design/assets/power-still/01.webp",
    images: [
      "/design/assets/power-still/01.webp"
    ],
    stats: [
      {
        key: "play",
        value: "278,492"
      },
      {
        key: "length",
        value: "0:57"
      }
    ],
    links: [
      {
        key: "bilibili",
        href: "https://www.bilibili.com/video/BV1er4y1U7Mw/"
      }
    ],
    video: {
      bvid: "BV1er4y1U7Mw",
      cid: "463019928"
    }
  },
  {
    slug: "vivahappy-medley",
    section: "motion",
    date: "2025-08-31",
    featured: false,
    cover: "/design/assets/vivahappy-medley/01.webp",
    images: [
      "/design/assets/vivahappy-medley/01.webp"
    ],
    stats: [
      {
        key: "play",
        value: "2,962"
      },
      {
        key: "length",
        value: "0:11"
      }
    ],
    links: [
      {
        key: "bilibili",
        href: "https://www.bilibili.com/video/BV1jjhrzrED9/"
      }
    ],
    video: {
      bvid: "BV1jjhrzrED9",
      cid: "32062833539"
    }
  },
  {
    slug: "exc2-cm2",
    section: "motion",
    date: "2023-06-16",
    featured: false,
    cover: "/design/assets/exc2-cm2/01.webp",
    images: [
      "/design/assets/exc2-cm2/01.webp"
    ],
    stats: [
      {
        key: "play",
        value: "6,002"
      },
      {
        key: "length",
        value: "0:47"
      }
    ],
    links: [
      {
        key: "bilibili",
        href: "https://www.bilibili.com/video/BV1zV4y1m7SM/"
      }
    ],
    video: {
      bvid: "BV1zV4y1m7SM",
      cid: "1164990416"
    }
  },
  {
    slug: "exc2-cm2-p2",
    section: "motion",
    date: "2023-11-11",
    featured: false,
    cover: "/design/assets/exc2-cm2-p2/01.webp",
    images: [
      "/design/assets/exc2-cm2-p2/01.webp"
    ],
    stats: [
      {
        key: "play",
        value: "4,327"
      },
      {
        key: "length",
        value: "0:24"
      }
    ],
    links: [
      {
        key: "bilibili",
        href: "https://www.bilibili.com/video/BV1jg4y1Q71m/"
      }
    ],
    video: {
      bvid: "BV1jg4y1Q71m",
      cid: "1328935845"
    }
  },
  {
    slug: "huawen-hupo",
    section: "motion",
    date: "2023-11-11",
    featured: false,
    cover: "/design/assets/huawen-hupo/01.webp",
    images: [
      "/design/assets/huawen-hupo/01.webp"
    ],
    stats: [
      {
        key: "play",
        value: "5,726"
      },
      {
        key: "length",
        value: "0:11"
      }
    ],
    links: [
      {
        key: "bilibili",
        href: "https://www.bilibili.com/video/BV1KC4y1S7hz/"
      }
    ],
    video: {
      bvid: "BV1KC4y1S7hz",
      cid: "1328947735"
    }
  },
  {
    slug: "nebula-overlap",
    section: "motion",
    date: "2023-11-11",
    featured: false,
    cover: "/design/assets/nebula-overlap/01.webp",
    images: [
      "/design/assets/nebula-overlap/01.webp"
    ],
    stats: [
      {
        key: "play",
        value: "2,277"
      },
      {
        key: "length",
        value: "0:13"
      }
    ],
    links: [
      {
        key: "bilibili",
        href: "https://www.bilibili.com/video/BV16N411M7da/"
      }
    ],
    video: {
      bvid: "BV16N411M7da",
      cid: "1328955927"
    }
  },
  {
    slug: "procedural-memphis",
    section: "motion",
    date: "2023-11-11",
    featured: false,
    cover: "/design/assets/procedural-memphis/01.webp",
    images: [
      "/design/assets/procedural-memphis/01.webp"
    ],
    stats: [
      {
        key: "play",
        value: "1,992"
      },
      {
        key: "length",
        value: "0:05"
      }
    ],
    links: [
      {
        key: "bilibili",
        href: "https://www.bilibili.com/video/BV14Q4y187J8/"
      }
    ],
    video: {
      bvid: "BV14Q4y187J8",
      cid: "1328924461"
    }
  },
  {
    slug: "karasu-collab",
    section: "motion",
    date: "2024-10-12",
    featured: false,
    cover: "/design/assets/karasu-collab/01.webp",
    images: [
      "/design/assets/karasu-collab/01.webp"
    ],
    stats: [
      {
        key: "play",
        value: "8,877"
      },
      {
        key: "length",
        value: "2:05"
      }
    ],
    links: [
      {
        key: "bilibili",
        href: "https://www.bilibili.com/video/BV1Rv2mY7EHE/"
      }
    ],
    video: {
      bvid: "BV1Rv2mY7EHE",
      cid: "26240287897"
    }
  },
  {
    slug: "diy-renderer",
    section: "tools",
    date: "2022-01 — 2023-06",
    featured: true,
    cover: "/design/assets/diy-renderer/01.webp",
    images: [
      "/design/assets/diy-renderer/01.webp",
      "/design/assets/diy-renderer/02.webp",
      "/design/assets/diy-renderer/03.webp",
      "/design/assets/diy-renderer/04.webp",
      "/design/assets/diy-renderer/05.webp",
      "/design/assets/diy-renderer/06.webp",
      "/design/assets/diy-renderer/07.webp",
      "/design/assets/diy-renderer/08.webp",
      "/design/assets/diy-renderer/09.webp",
      "/design/assets/diy-renderer/10.webp",
      "/design/assets/diy-renderer/11.webp",
      "/design/assets/diy-renderer/12.webp",
      "/design/assets/diy-renderer/13.webp",
      "/design/assets/diy-renderer/14.webp",
      "/design/assets/diy-renderer/15.webp"
    ],
    stats: [
      {
        key: "lines",
        value: "10k+"
      },
      {
        key: "like",
        value: "85"
      }
    ],
    links: [
      {
        key: "repo",
        href: "https://github.com/XDzzzzzZyq/OpengL"
      },
      {
        key: "videoLog",
        href: "https://www.bilibili.com/video/BV1MW4y127sQ/"
      },
      {
        key: "post",
        href: "https://www.bilibili.com/opus/812885907506987015"
      },
      {
        key: "tutorial",
        href: "https://learnopengl-cn.github.io/08%20Guest%20Articles/2022/03%20Area%20Lights/"
      }
    ],
    video: {
      bvid: "BV1MW4y127sQ",
      cid: "779115204"
    }
  },
  {
    slug: "text-island-block",
    section: "tools",
    date: "2023-08-08",
    featured: true,
    cover: "/design/assets/text-island-block/01.webp",
    images: [
      "/design/assets/text-island-block/01.webp",
      "/design/assets/text-island-block/02.webp",
      "/design/assets/text-island-block/03.webp",
      "/design/assets/text-island-block/04.webp"
    ],
    stats: [
      {
        key: "like",
        value: "368"
      },
      {
        key: "view",
        value: "6,432"
      }
    ],
    links: [
      {
        key: "article",
        href: "https://www.bilibili.com/read/cv25600334/"
      },
      {
        key: "post",
        href: "https://www.bilibili.com/opus/827378402526756871"
      }
    ]
  },
  {
    slug: "rune-font",
    section: "tools",
    date: "2023-12-27",
    featured: true,
    cover: "/design/assets/rune-font/01.webp",
    images: [
      "/design/assets/rune-font/01.webp",
      "/design/assets/rune-font/02.webp",
      "/design/assets/rune-font/03.webp",
      "/design/assets/rune-font/04.webp"
    ],
    stats: [
      {
        key: "like",
        value: "334"
      }
    ],
    links: [
      {
        key: "post",
        href: "https://www.bilibili.com/opus/646748081153376263"
      },
      {
        key: "strokePost",
        href: "https://www.bilibili.com/opus/647128851487391797"
      }
    ]
  },
  {
    slug: "physics-dropper",
    section: "tools",
    date: "2022-02-09",
    featured: false,
    cover: "/design/assets/physics-dropper/01.webp",
    images: [
      "/design/assets/physics-dropper/01.webp"
    ],
    stats: [
      {
        key: "like",
        value: "81"
      }
    ],
    links: [
      {
        key: "post",
        href: "https://www.bilibili.com/opus/625128980945569019"
      }
    ]
  },
  {
    slug: "blender-patch",
    section: "tools",
    date: "2024-02-28",
    featured: false,
    cover: "/design/assets/blender-patch/01.webp",
    images: [
      "/design/assets/blender-patch/01.webp",
      "/design/assets/blender-patch/02.webp"
    ],
    stats: [
      {
        key: "like",
        value: "129"
      }
    ],
    links: [
      {
        key: "post",
        href: "https://www.bilibili.com/opus/903010564722130980"
      },
      {
        key: "issue",
        href: "https://projects.blender.org/blender/blender/issues/117101"
      }
    ]
  },
  {
    slug: "sdf-field-note",
    section: "tools",
    date: "2024-01-02",
    featured: false,
    cover: "/design/assets/sdf-field-note/01.webp",
    images: [
      "/design/assets/sdf-field-note/01.webp",
      "/design/assets/sdf-field-note/02.webp",
      "/design/assets/sdf-field-note/03.webp",
      "/design/assets/sdf-field-note/04.webp"
    ],
    stats: [
      {
        key: "like",
        value: "59"
      },
      {
        key: "view",
        value: "3,758"
      }
    ],
    links: [
      {
        key: "article",
        href: "https://www.bilibili.com/read/cv28960292/"
      },
      {
        key: "post",
        href: "https://www.bilibili.com/opus/881973965200818182"
      }
    ]
  },
  {
    slug: "area-light-note",
    section: "tools",
    date: "2023-06-16",
    featured: false,
    cover: "/design/assets/area-light-note/01.webp",
    images: [
      "/design/assets/area-light-note/01.webp",
      "/design/assets/area-light-note/02.webp",
      "/design/assets/area-light-note/03.webp",
      "/design/assets/area-light-note/04.webp"
    ],
    stats: [
      {
        key: "like",
        value: "70"
      },
      {
        key: "view",
        value: "3,149"
      }
    ],
    links: [
      {
        key: "article",
        href: "https://www.bilibili.com/read/cv24390369/"
      },
      {
        key: "post",
        href: "https://www.bilibili.com/opus/807663862930210816"
      }
    ]
  },
  {
    slug: "math-series",
    section: "graphic",
    date: "2025-05 — 2026-05",
    featured: true,
    cover: "/design/assets/math-series/01.webp",
    images: [
      "/design/assets/math-series/01.webp",
      "/design/assets/math-series/02.webp",
      "/design/assets/math-series/03.webp",
      "/design/assets/math-series/04.webp",
      "/design/assets/math-series/05.webp",
      "/design/assets/math-series/06.webp"
    ],
    stats: [
      {
        key: "pieces",
        value: "3"
      },
      {
        key: "like",
        value: "145 / 89 / 68"
      }
    ],
    links: [
      {
        key: "ito",
        href: "https://www.bilibili.com/opus/1064447373085769729"
      },
      {
        key: "quadratic",
        href: "https://www.bilibili.com/opus/1198973264968286211"
      },
      {
        key: "urysohn",
        href: "https://www.bilibili.com/opus/1199323558196543488"
      }
    ]
  },
  {
    slug: "daydreaming",
    section: "graphic",
    date: "2022-10 — 2024-04",
    featured: true,
    cover: "/design/assets/daydreaming/01.webp",
    images: [
      "/design/assets/daydreaming/01.webp",
      "/design/assets/daydreaming/02.webp",
      "/design/assets/daydreaming/03.webp",
      "/design/assets/daydreaming/04.webp",
      "/design/assets/daydreaming/05.webp",
      "/design/assets/daydreaming/06.webp",
      "/design/assets/daydreaming/07.webp",
      "/design/assets/daydreaming/08.webp"
    ],
    stats: [
      {
        key: "like",
        value: "76"
      },
      {
        key: "view",
        value: "2,662"
      }
    ],
    links: [
      {
        key: "article",
        href: "https://www.bilibili.com/read/cv34175530/"
      },
      {
        key: "dreamPost",
        href: "https://www.bilibili.com/opus/714226608805773330"
      }
    ]
  },
  {
    slug: "control-scenes",
    section: "graphic",
    date: "2021-12 — 2022-04",
    featured: true,
    cover: "/design/assets/control-scenes/01.webp",
    images: [
      "/design/assets/control-scenes/01.webp",
      "/design/assets/control-scenes/02.webp",
      "/design/assets/control-scenes/03.webp",
      "/design/assets/control-scenes/04.webp",
      "/design/assets/control-scenes/05.webp",
      "/design/assets/control-scenes/06.webp",
      "/design/assets/control-scenes/07.webp",
      "/design/assets/control-scenes/08.webp",
      "/design/assets/control-scenes/09.webp",
      "/design/assets/control-scenes/10.webp",
      "/design/assets/control-scenes/11.webp",
      "/design/assets/control-scenes/12.webp",
      "/design/assets/control-scenes/13.webp",
      "/design/assets/control-scenes/14.webp",
      "/design/assets/control-scenes/15.webp",
      "/design/assets/control-scenes/16.webp"
    ],
    stats: [
      {
        key: "scenes",
        value: "9+"
      },
      {
        key: "like",
        value: "106 / 75"
      }
    ],
    links: [
      {
        key: "control67",
        href: "https://www.bilibili.com/opus/644932993633222697"
      },
      {
        key: "controlEarly",
        href: "https://www.bilibili.com/opus/600352719074693850"
      }
    ]
  },
  {
    slug: "typesetting-series",
    section: "graphic",
    date: "2021-08 — 2021-11",
    featured: true,
    cover: "/design/assets/typesetting-series/01.webp",
    images: [
      "/design/assets/typesetting-series/01.webp",
      "/design/assets/typesetting-series/02.webp",
      "/design/assets/typesetting-series/03.webp",
      "/design/assets/typesetting-series/04.webp",
      "/design/assets/typesetting-series/05.webp",
      "/design/assets/typesetting-series/06.webp"
    ],
    stats: [
      {
        key: "pieces",
        value: "6"
      },
      {
        key: "like",
        value: "124 / 115 / 77"
      }
    ],
    links: [
      {
        key: "mood",
        href: "https://www.bilibili.com/opus/589485700196842860"
      },
      {
        key: "must",
        href: "https://www.bilibili.com/opus/581817684627394021"
      },
      {
        key: "today",
        href: "https://www.bilibili.com/opus/559848385745304617"
      }
    ]
  }
];

export const getWorksBySection = (section: WorkSection): WorkItem[] =>
  works.filter((work) => work.section === section);

export const getWork = (slug: string): WorkItem | undefined =>
  works.find((work) => work.slug === slug);
