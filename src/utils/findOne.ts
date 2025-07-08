import { Model } from 'mongoose';
import { COMMON_EXCLUDE_FIELDS } from 'src/common/projection';

export async function findOne<T>(
    model: Model<T>,
    filter = {},
    projection: { [key: string]: 0 | 1 } = {}
): Promise<Partial<T> | null> {
    return model
        .findOne(filter)
        .select({ ...COMMON_EXCLUDE_FIELDS, ...projection })
        .lean()
        .exec() as Promise<Partial<T> | null>;
}
