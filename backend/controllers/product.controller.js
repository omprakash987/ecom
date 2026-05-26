// import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js"
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async(req,res)=>{
try {
    const products = await Product.find({})
    res.json({products})
    
} catch (error) {
    console.log("error : " , error); 
    res.status(500).json({
        message:"internal server error "
    })
}
}

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts || featuredProducts.length === 0) {
      return res.status(400).json({
        message: "no featured products",
      });
    }

    res.json(featuredProducts);
  } catch (error) {
    console.log("error : ", error);
    return res.status(500).json({
      message: "internal server error from featured products",
    });
  }
};

export const createProduct = async(req,res)=>{
    try {
        const {name,description,price,image,category,isFeatured} = req.body; 

        let cloudinaryResponse = null; 

        if(image){
         cloudinaryResponse = await cloudinary.uploader.upload(image,{folder:"products"})

        }

        const product = await Product.create({
            name,
            description,
            price,
            image:cloudinaryResponse?.secure_url?cloudinaryResponse.secure_url:"",
            category,
            isFeatured,
        })
        res.status(201).json({
        product
        })
    } catch (error) {
        console.log("error from create product : ", error ); 
        res.status(500).json({
            message : "interanal server error from create Product"
        })
    }
}

export const deleteProduct = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id); 
        console.log("product yahi se : ", product); 
        if(!product){
            return res.status(404).json({
                message:"product not found"
            })
        }
        if(product.image){
            const publicId = product.image.split("/").pop().split(".")[0]; 
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`); 
            } catch (error) {
                console.log("error deleting error from cloudinary : ", error); 
            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({
            message:"product deleted successfully"
        })
        
    } catch (error) {
        console.log("error  : ", error); 
        res.status(500).json({
            message:"internal server error "
        })
    }
}

export const getRecommendedProducts = async(req,res)=>{
    try {
        const products = await Product.aggregate([
            {
                $sample:{size:3}
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    description:1,
                    image:1,
                    price:1,
                }
            }
        ])
        res.json(products)
        
    } catch (error) {
        console.log("error ", error);
        res.status(500).json({
            message:"internal server error"
        })
    }
}

export const getProductsByCategory = async(req,res)=>{
    const {category} =req.params;

    try {
        const products = await Product.find({category}); 
        res.json({products}); 
        
    } catch (error) {
        console.log("error : ", error); 
        res.status(500).json({
            message:"internal server error "
        })
    }
}

export const toggleFeaturedProduct = async(req,res)=>{
    

    try {
        const product = await Product.findById(req.params.id); 
        if(product){
            product.isFeatured = !product.isFeatured; 
            const updatedProduct = await product.save(); 
            // await updateFeaturedProductCache(); 
            res.json(updatedProduct); 
        }else{
            res.status(404).json({
                message:"product not found"
            })
        }

    } catch (error) {
        console.log("error : ", error); 
        res.status(500).json({
            message:"internal server error : "
        })
    }
}

export const getSearch = async(req,res)=>{
     try {
    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const products = await Product.find({
      name: { $regex: query, $options: "i" }, // case insensitive search
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log("productid : " , product)

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getTrendingCreatine = async (req, res) => {
  try {
    const products = await Product.find({ category: "creatine" })
      .sort({ createdAt: -1 })  
      .limit(6);

    res.json(products);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      message: "error fetching trending creatine",
    });
  }
};
export const getTrendingBCAA = async (req, res) => {
  try {
    const products = await Product.find({ category: "BCAA" })
      .sort({ createdAt: -1 }) // latest = trending (for now)
      .limit(6);

    res.json(products);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      message: "error fetching trending creatine",
    });
  }
};

export const getTrendingEAA = async (req, res) => {
  try {
    const products = await Product.find({ category: "EAA" })
      .sort({ createdAt: -1 })  
      .limit(6);

    res.json(products);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      message: "error fetching trending creatine",
    });
  }
};

export const getTrendingFishOil = async (req, res) => {
  try {
    const products = await Product.find({ category: "FishOil" })
      .sort({ createdAt: -1 }) // latest = trending (for now)
      .limit(6);

    res.json(products);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      message: "error fetching trending creatine",
    });
  }
};

export const getTrendingpreworkout = async (req, res) => {
  try {
    const products = await Product.find({ category: "preworkout" })
      .sort({ createdAt: -1 }) // latest = trending (for now)
      .limit(6);

    res.json(products);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      message: "error fetching trending creatine",
    });
  }
};
export const getTrendingMultivitamin = async (req, res) => {
  try {
    const products = await Product.find({ category: "Multivitamin" })
      .sort({ createdAt: -1 }) // latest = trending (for now)
      .limit(6);

    res.json(products);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      message: "error fetching trending creatine",
    });
  }
};
export const getTrendingWhey = async (req, res) => {
  try {
    const products = await Product.find({ category: "Whey" })
      .sort({ createdAt: -1 }) // latest = trending (for now)
      .limit(6);

    res.json(products);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({
      message: "error fetching trending creatine",
    });
  }
};


// async function updateFeaturedProductCache(){
//     try {
//         const featuredProducts = await Product.find({isFeatured:true}).lean(); 
//     await redis.set("featured_products",JSON.stringify(featuredProducts)); 
        
//     } catch (error) {
//         console.log("error updating featuredproduct :", error); 
//     }
// }


