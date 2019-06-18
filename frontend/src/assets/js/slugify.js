export default function (str) {
  try {
    return str.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]*/g, '').replace(/[^a-z0-9]+/gi, ' ').replace(/(^\s*|\s*)$/,'').replace(/\s+/gi,'-')
  } catch (e) {
    return str.toLowerCase().replace(/[\u0300-\u036f]*/g, '').replace(/[^a-z0-9]+/gi, ' ').replace(/(^\s*|\s*)$/,'').replace(/\s+/gi,'-')
  }
}
