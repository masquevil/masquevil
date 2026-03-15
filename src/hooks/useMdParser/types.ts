import {} from 'marked';

// 扩展 Tokens 命名空间，添加自定义 token 类型
declare module 'marked' {
  namespace Tokens {
    interface CodeCustomGeneric {
      type: string;
      raw: string;
      text: string;
    }

    interface ValidityTag {
      type: 'validity-tag';
      raw: string;
      year: string;
      month: string;
    }
  }
}
