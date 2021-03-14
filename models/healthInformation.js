class healthInformation {
  constructor(
    _id,
    name,
    age,
    increase,
    locationOfPain,
    symptom,
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
    this.symptom = symptom;
    this.radiance = radiance;
    this.scale = scale;
    this.createdAt = createdAt;
    this.imageUri = imageUri;
    this.resolved = resolved;
  }
}
export default healthInformation;
