import Backup from '../models/backupModel'

export const postBackup = async (data) => {
	return await Backup.create(data)
}

export const getBackup = async () => {
	return await Backup.find({}).limit(10)
}