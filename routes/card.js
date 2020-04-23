const {Router} = require('express')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const router = Router()

function mapCartItems(cart) {
    return cart.items.map(c => ({
        ...c.courseId._doc,
        id: c.courseId.id,
        count: c.count
    }))
}

function computePrice(courses) {
    return courses.reduce((total, course) => {
        return total += course.price * course.count
    }, 0)
}

router.post('/add', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.body.id)
        await req.user.addToCart(course)
        res.redirect('/card')
    } catch (e) {
        console.log(e)
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const user = await req.user
            .populate('cart.items.courseId')
            .execPopulate()

        const courses = mapCartItems(user.cart)

        res.render('card', {
            title: 'Корзина',
            isCard: true,
            courses: courses,
            price: computePrice(courses)
        })
    } catch (e) {
        console.log(e)
    }
})

router.delete('/remove/:id', auth, async (req, res) => {
    try {
        await req.user.removeFromCart(req.params.id)
        const user = await req.user
            .populate('cart.items.courseId')
            .execPopulate()

        const courses = mapCartItems(user.cart)
        const cart = {
            courses, price: computePrice(courses)
        }   
    res.status(200).json(cart)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/clear', auth, async (req, red) => {
    try {
        await req.user.clearCart()
    } catch (e) {
        console.log(e)
    }
})

module.exports = router