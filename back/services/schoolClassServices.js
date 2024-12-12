const GenericService = require("./genericServices");
const ApiResponse = require("../models/apiResponse");

class SchoolClassService extends GenericService {
    async getAll(req, res) {
        const { page: reqPage, limit: reqLimit, ...filters } = req.query;
        const page = parseInt(reqPage) || 1;
        const limit = parseInt(reqLimit);
        const offset = (page - 1) * limit;

        try {
            const models = await this.Model.find(filters)
                .skip(offset)
                .limit(limit)
                .populate("graduatingId");

            const countTotal = await this.Model.countDocuments(filters);
            res.set('X-Total-Count', countTotal);
            return res.status(200).json(new ApiResponse({
                success: true,
                data: models,
            }));
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
            return res.status(500).json(new ApiResponse({
                success: false,
                error: "Erreur interne du serveur",
            }));
        }
    }
}

module.exports = SchoolClassService;