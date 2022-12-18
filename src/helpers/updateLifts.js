export const findObjectItemInArray = function funcFindObjectItemInArray(arr, id) {
    const searchedObject = arr.find((obj) => obj.id === id);
    const searchedObjectId = arr.findIndex((obj) => obj.id === id);

    return [searchedObject, searchedObjectId]
}

export const updateLiftDuration = function funcUpdateLiftDuration(curFloor, nextFloor, callStackLength) {
    return callStackLength === 0
        ? null
        : nextFloor > curFloor
            ? "up"
            : "down";
}

export const updateLifts = function funcUpdateLiftNextFloor(arr, id, callStackLength, keysValues) {
    const updatedArr = [...arr];
    const [desiredObject, desiredObjectId]  = findObjectItemInArray(arr, id);

    Object.assign(desiredObject, keysValues);

    if (desiredObject.status !== "Stopped") {
        desiredObject.duration = updateLiftDuration(
            desiredObject.curFloor,
            desiredObject.nextFloor,
            callStackLength
        );
    }

    updatedArr.splice(desiredObjectId, 1, desiredObject);

    return updatedArr;
}