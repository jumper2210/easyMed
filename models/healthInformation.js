class healthInformation {
  constructor(
    _id,
    name,
    symptom,
    weight,
    doctorNotes,
    createdAt,
    imageUri,
    resolved
  ) {
    this._id = _id;
    this.name = name;
    this.symptom = symptom;
    this.weight = weight;
    this.doctorNotes = doctorNotes;
    this.createdAt = createdAt;
    this.imageUri = imageUri;
    this.resolved = resolved;
  }
}
export default healthInformation;
