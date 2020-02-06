import Company from '../models/companyModel'

export const getCompany = async () => {
	return await Company.find({}).limit(10)
}

export const postCompany = async ({ name, employees }) => {
	return await Company.create({ name, employees })
}

export const getCompanyById = async (_id) => {
	return await Company.find(_id)
}