import BadWordsFilter from 'bad-words'

module.exports = function (text) {
  const filter = new BadWordsFilter()
  filter.addWords('tea', 'cakes', 'pastries', 'pastry', 'cake')

  return filter.clean(text)
}
