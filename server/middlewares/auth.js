const isAuthenticated = (req,res,next) => {
    if(req.session == null || req.session.user == undefined) {
        req.flash('alertMessage', 'Session expired!')
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/signin')
    } else {
        next();
    }
}

module.exports = isAuthenticated;