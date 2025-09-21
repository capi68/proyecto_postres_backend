const { where } = require("sequelize");
const db = require("./models"); 

(async () => {
    try {
        // limpiar tablas solo para test
        await db.sequelize.sync({ force: true });

        //crear un usuario
        const user = await db.User.create({
            name: "Juan",
            email: "juan@test.com",
            password: "123456"
        });

        //crear un producto
        const product = await db.Product.create({ 
            name: "Tarta de chocolate",
            description: "deliciosa tarta con cobertura de chocolate",
            price: 15.99,
            image_desktop: "choco_desktop.jpg",
            image_tablet: "choco_tablet.jpg",
            image_mobile: "choco_mobile.jpg"
        });

        //Crear un cartItem que une user + product
        const cartItem = await db.CartItem.create({
            productId: product.id,
            userId: user.id,
            quantity: 2
        });

        console.log("Datos creados correctamente");
        console.log({ user: user.toJSON(), product: product.toJSON(), cartItem: cartItem.toJSON() });

        //consultar con asociaciones
        const userWithCart = await db.User.findOne({
            where: { id: user.id },
            include: [
                {
                    model: db.CartItem, 
                    as: "cartItems",
                    include: [
                        {
                            model: db.Product,
                            as: "product"
                        }
                    ]
                }
            ]
        });

        console.log("User con su carrito incluido");
        console.dir(userWithCart.toJSON(), { depth: null });

        // consuklta inversa producto con los usuarios que lo tienen en carrito
        const productWithUsers = await db.Product.findOne({
            where: { id: product.id },
            include: [
                {
                    model: db.CartItem,
                    as: "cartItems",
                    include: [{ model: db.User, as: "User" }]
                }
            ]
        });

        console.log("producto con los usuarios que lo tienen en carrito:");
        console.dir(productWithUsers.toJSON(), { depth: null });

        process.exit();
    } catch (error) {
        console.error("error en el test", error);
        process.exit(1);
    }
})();
