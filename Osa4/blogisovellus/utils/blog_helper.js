const _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs)  => {
    return blogs.reduce((a, b) => a + (b['likes'] || 0), 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((a, b) => (a.likes > b.likes) ?  a : b)
}
  
const mostBlogs = (bloglist) => {
    const authors = _.countBy(bloglist, 'author')
    const list = _.entries(authors)
    const most = _.maxBy(list, _.last)
    return { author : most[0], blogs : most[1] }
}

const mostLikes = (bloglist) => {
    const result = _(bloglist)
        .groupBy('author')
        .map((objs, key) => ({
            'author': key,
            'likes': _.sumBy(objs, 'likes') }))
        .value()
    const what = _.maxBy(result, 'likes')
    return { author : what.author, likes : what.likes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}