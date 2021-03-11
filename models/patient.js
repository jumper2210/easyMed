class Patient {
  constructor(
    _id,
    name,
    medicalCases,
    email,
    phoneNumber,
    avatar,
    role,
    clinics,
    isAssignClinic,
    medicalVisits
  ) {
    this._id = _id;
    this.name = name;
    this.medicalCases = medicalCases;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.avatar = avatar;
    this.role = role;
    this.clinics = clinics;
    this.isAssignClinic = isAssignClinic;
    this.medicalVisits = medicalVisits;
  }
}
export default Patient;
