////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { isString } from '@qubit-ltd/type-detect';

/**
 * URL地址验证规则。
 *
 * @type {object}
 * @namespace
 * @author 胡海星
 */
const UrlRule = {
  /**
   * 测试URL是否是合法的网址。
   *
   * 合法的网址的schema必须是HTTP或HTTPS协议。
   *
   * @param {String} url
   *    待测试的URL，前后允许有空白字符。
   * @return {Boolean}
   *    若URL合法则返回true；否则返回false。
   * @author 胡海星
   */
  isValid(url) {
    if (!isString(url)) {
      return false;
    }
    const u = url.trim();
    if ((u.length === 0) || (u.length > 2048)) {
      return false;
    }
    if (/[^\u0020-\u007E]/.test(u)) {
      return false;
    }
    if (!/^https?:\/\//i.test(u)) {
      return false;
    }
    if (/^https?:\/\/\/+/i.test(u)) {
      return false;
    }
    if (/%(?![0-9A-Fa-f]{2})/.test(u)) {
      return false;
    }
    if ((u.match(/#/g) || []).length > 1) {
      return false;
    }
    if (typeof globalThis.URL !== 'function') {
      return false;
    }
    try {
      const parsed = new globalThis.URL(u);
      if ((parsed.protocol !== 'http:') && (parsed.protocol !== 'https:')) {
        return false;
      }
      return parsed.hostname.length > 0;
    } catch {
      return false;
    }
  },
};

export default UrlRule;
