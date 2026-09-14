
export function getProducts(req,res){
    try {
        res.json({
            ok: true,
            msg: 'Products founded',
            data: 'Products'
        })
        
    } catch (error) {
        res.json({
            ok: true,
            msg: 'server internal error'
        })
        
    }
}

export function createProduct(req,res){
    try {
        res.json({
            ok: true,
            msg: 'product created',
            data: 'Product'
        })
        
    } catch (error) {
        res.json({
            ok: true,
            msg: 'server internal error'
        })
        
    }
}

export function deleteProduct(req,res){
    try {
        res.json({
            ok: true,
            msg: 'Product deleted',
            data: 'Product'
        })
        
    } catch (error) {
        res.json({
            ok: true,
            msg: 'server internal error'
        })
        
    }
}

export function updateProduct(req,res){
    try {
        res.json({
            ok: true,
            msg: 'Product updated',
            data: 'Product'
        })
        
    } catch (error) {
        res.json({
            ok: true,
            msg: 'server internal error'
        })
        
    }
}