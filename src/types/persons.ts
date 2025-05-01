export interface PersonData {
    id: number;
  street: string;
  streetName: string;
  buildingNumber: string;
  city: string;
  zipcode: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
}
export interface PersonsResponse {
status: string;
code: number;
locale: string;
seed: number | null;
total: number;
data: PersonData[];
}