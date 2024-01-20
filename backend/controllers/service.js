import Category from "../models/category.js";
import Product from "../models/product.js";
import Service from "../models/service.js";
// import Product from "../models/product.js";


export const createOrUpdateService = async (req, res) => {
    try {
        const {
            id,
            serviceTitle,
            laundryPerPair,
            laundryByKG
        } = req.body;

        // Check if the provided id exists in the Service collection
        const existingService = await Service.findById(id);

        if (existingService) {
            // If id exists, update the existing document
            existingService.serviceTitle = serviceTitle;
            existingService.laundryPerPair = laundryPerPair;
            existingService.laundryByKG = laundryByKG;

            await existingService.save();

            return res.status(200).json({
                message: 'Service updated successfully',
                service: existingService
            });
        } else {
            // If id does not exist, create a new document
            const newService = new Service({
                serviceTitle,
                laundryPerPair,
                laundryByKG
            });
            await newService.save();

            return res.status(201).json({
                message: 'Service created successfully',
                service: newService
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

export const getAllServicesWithItems = async (req, res) => {
    try {
        const services = await Service.find()
        .populate({
          path: 'laundryPerPair.items',
          model: Product,
          populate: {
            path: 'category',  // assuming category is a reference to another model
            model: Category, // replace 'Category' with the actual model name for the category
          },
        })
        .populate({
          path: 'laundryByKG.items',
          model: Product,
          populate: {
            path: 'category',  // assuming category is a reference to another model
            model: Category, // replace 'Category' with the actual model name for the category
          },
        });
      

        return res.status(200).json({
            services,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


export const getServiceByIdWithItems = async (req, res) => {
    try {
        const {
            id: serviceId 
        } = req.params;

        const service = await Service.findById(serviceId).populate({
            path: 'laundryPerPair.items',
            model: Product,
            populate: {
              path: 'category',  // assuming category is a reference to another model
              model: Category, // replace 'Category' with the actual model name for the category
            },
          })
          .populate({
            path: 'laundryByKG.items',
            model: Product,
            populate: {
              path: 'category',  // assuming category is a reference to another model
              model: Category, // replace 'Category' with the actual model name for the category
            },
          });
        if (!service) {
            return res.status(404).json({
                message: 'Service not found',
                ok: false
            });
        }
        return res.status(200).json({
            service,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


export const deleteServiceById = async (req, res) => {
    try {
        const {
            id: serviceId 
        } = req.params;

        console.log('serviceIdserviceIdserviceIdserviceIdserviceIdserviceIdserviceId',serviceId);   

        const deletedService = await Service.findByIdAndDelete(serviceId);

        if (!deletedService) {
            return res.status(404).json({
                message: 'Service not found',
                ok: false
            });
        }

        return res.status(200).json({
            message: 'Service deleted successfully',
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            ok: false
        });
    }
};