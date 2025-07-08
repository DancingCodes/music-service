import { Model, SortOrder } from 'mongoose';
import { COMMON_EXCLUDE_FIELDS } from 'src/common/projection';

export async function paginate<T>(
    model: Model<T>,
    pageNo = 1,
    pageSize = 10,
    filter = {},
    sort: { [key: string]: SortOrder } = { _id: -1 },
    projection: { [key: string]: 0 | 1 } = {}
) {
    const skip = (pageNo - 1) * pageSize;
    const total = await model.countDocuments(filter).exec();

    const list = await model
        .find(filter)
        .select({
            ...projection,
            ...COMMON_EXCLUDE_FIELDS
        })
        .sort(sort)
        .skip(skip)
        .limit(pageSize)
        .exec();

    return { total, list };
}
