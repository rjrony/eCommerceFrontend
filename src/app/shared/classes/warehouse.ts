export class Warehouse {
    name: string;
    adminComment?: string;
    description?: any;
    displayOrder: number;
    id: string;
    latitude: string;
    longitude: string;
    pictureId?: string;
    address: Address;
}

export interface Address {
    countryId?: string;
    stateProvinceId?: string;
    city?: string;
    address1?: string;
    address2?: string;
    zipPostalCode?: string;
    phoneNumber?: string;
    id: string;
}
