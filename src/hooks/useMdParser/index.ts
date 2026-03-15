import { Marked } from 'marked';

const marked = new Marked({
  breaks: true,
  gfm: true,
  async: false,
});

// common extensions
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

let initialized = false;

export default function useMdParser() {
  if (!initialized) {
    initialized = true;
    // extensions
    // marked.use(...);
  }

  return {
    parse: (content: string) => marked.parse(content) as string,
  };
}
