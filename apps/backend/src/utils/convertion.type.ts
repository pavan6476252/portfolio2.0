import { ObjectId } from 'mongodb'
export const toObjectId = (value: string | ObjectId): ObjectId => {
  return typeof value === 'string' ? new ObjectId(value) : value
}