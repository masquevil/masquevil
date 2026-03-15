import type { RendererThis, Tokens } from 'marked';
import './types';

export default function createValidityTagExtension() {
  return {
    extensions: [
      {
        name: 'validity-tag',
        level: 'inline' as const,
        start(src: string) {
          // 匹配 `!:YYYY:M:!` 格式
          return src.match(/!:\d{4}:\d{1,2}:!/)?.index;
        },
        tokenizer(src: string) {
          const rule = /^!:(\d{4}):(\d{1,2}):!/;
          const match = rule.exec(src);

          if (match) {
            const [raw, year, month] = match;
            return {
              type: 'validity-tag',
              raw,
              year,
              month,
            };
          }
        },
        renderer(this: RendererThis, token: Tokens.ValidityTag) {
          const { year, month } = token;
          return `<span class="md-validity-tag">时效性：本文撰写于${year}年${parseInt(month, 10)}月</span>`;
        },
      },
    ],
  };
}
