class Doctor {
  constructor(
    _id,
    name,
    email,
    phoneNumber,
    avatar,
    role,
    specialization,
    clinics,
    medicalVisits
  ) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.avatar = avatar;
    this.role = role;
    this.specialization = specialization;
    this.clinics = clinics;
    this.medicalVisits = medicalVisits;
  }
}
export default Doctor;
