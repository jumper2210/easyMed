class medicalCase {
  constructor(
    _id,
    name,
    age,
    increase,
    locationOfPain,
    otherSymptom,
    pickedSymptom,
    radiance,
    scale,
    createdAt,
    imageUri,
    resolved
  ) {
    this._id = _id;
    this.name = name;
    this.age = age;
    this.increase = increase;
    this.locationOfPain = locationOfPain;
    this.otherSymptom = otherSymptom;
    this.pickedSymptom = pickedSymptom;
    this.radiance = radiance;
    this.scale = scale;
    this.createdAt = createdAt;
    this.imageUri = imageUri;
    this.resolved = resolved;
  }
}
export default medicalCase;
