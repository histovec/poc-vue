export default {
  plaqueSiv (plaque) {
    let s = plaque.toUpperCase()
    s = s.replace(/^(([A-Z]{1,2})((-|\s+)?([0-9])(([0-9]{1,2})((-|\s+)?([A-Z]{1,2}))?)?)?)?.*$/, '$2-$5$7-$10')
    s = s.replace(/-*$/, '')
    return s
  },
  plaqueFni (plaque) {
    let s = plaque.toUpperCase()
    s = s.replace(/^(([0-9])(([0-9]{1,3})((-|\s)?(([A-Z])(([A-Z]{1,2})((-|\s)?(([0-9])([0-9aA][0-9]?)?))?)?)?)?)?)?.*$/, '$2$4 $8$10 $14$15' )
    s = s.replace(/\s*$/, '')
    return s
  },
  dateOrYear (d) {
    let s = d.replace(/^(([0-3])((\d)(\/?([0-1])((\d)(\/?(([1-2])(\d{1,3})?))?)?)?)?)?.*$/, '$2$4/$6$8/$11$12')
    s = s.replace(/\/{1,2}$/, '')
    return s
  }
}