import { Marked } from 'marked';
import { baseUrl } from 'marked-base-url';
import createValidityTagExtension from './validity-tag-extension';

const marked = new Marked({
  breaks: true,
  gfm: true,
  async: false,
});

// common extensions
marked.use(baseUrl(import.meta.env.BASE_URL));

// custom extensions
marked.use(createValidityTagExtension());

// basic renderers
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      return `<h${depth} id="${text.replace(/\s+/g, '-')}" class="md-h${depth}">${text}</h${depth}>`;
    },
    paragraph({ tokens }) {
      const text = this.parser.parseInline(tokens);
      return `<p class="md-p">${text}</p>`;
    },
    hr() {
      return '<hr class="md-hr">';
    },
    strong({ tokens }) {
      const text = this.parser.parseInline(tokens);
      return `<strong class="md-strong">${text}</strong>`;
    },
    list(token) {
      const tag = token.ordered ? 'ol' : 'ul';
      const items = token.items
        .map((item) => {
          const content = this.parser.parseInline(item.tokens);
          return `<li class="md-li">${content}</li>`;
        })
        .join('');
      return `<${tag} class="md-${tag}">${items}</${tag}>`;
    },
  },
});

export default function useMdParser() {
  return {
    parse: (content: string) => marked.parse(content) as string,
  };
}
