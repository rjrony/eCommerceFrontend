export interface ProductCategory {
    categoryId: string;
    isFeaturedProduct: boolean;
}

export interface ProductTag {
    Name: string;
    Count: number;
}

export interface ProductPicture {
    pictureId: string;
    displayOrder: number;
    mimeType?: any;
    seoFilename?: any;
    altAttribute?: any;
    titleAttribute?: any;
}

export class ProductModel {
    productTypeId: string;
    parentGroupedProductId?: any;
    visibleIndividually: boolean;
    name: string;
    seName: string;
    shortDescription: string;
    fullDescription: string;
    adminComment?: any;
    productLayoutId: string;
    brandId?: any;
    vendorId?: any;
    showOnHomePage: boolean;
    metaKeywords?: any;
    metaDescription?: any;
    metaTitle?: any;
    allowCustomerReviews: boolean;
    approvedRatingSum: number;
    notApprovedRatingSum: number;
    approvedTotalReviews: number;
    notApprovedTotalReviews: number;
    externalId?: any;
    sku?: any;
    mpn?: any;
    gtin?: any;
    isGiftVoucher: boolean;
    giftVoucherTypeId: string;
    overGiftAmount?: any;
    requireOtherProducts: boolean;
    requiredProductIds?: any;
    autoAddRequiredProducts: boolean;
    isDownload: boolean;
    downloadId?: any;
    unlimitedDownloads: boolean;
    downloadActivationTypeId: string;
    maxNumberOfDownloads: number;
    downloadExpirationDays?: any;
    hasSampleDownload: boolean;
    sampleDownloadId?: any;
    hasUserAgreement: boolean;
    userAgreementText?: any;
    isRecurring: boolean;
    recurringCycleLength: number;
    recurringTotalCycles: number;
    recurringCyclePeriodId: string;
    incBothDate: boolean;
    interval: number;
    intervalUnitId: string;
    isShipEnabled: boolean;
    isFreeShipping: boolean;
    shipSeparately: boolean;
    additionalShippingCharge: number;
    deliveryDateId: string;
    isTaxExempt: boolean;
    taxCategoryId?: any;
    isTele: boolean;
    useMultipleWarehouses: boolean;
    warehouseId?: any;
    stockQuantity: number;
    reservedQuantity: number;
    manageInventoryMethodId: string;
    stockAvailability: boolean;
    displayStockQuantity: boolean;
    minStockQuantity: number;
    lowStock: boolean;
    lowStockActivityId: string;
    notifyAdminForQuantityBelow: number;
    backorderModeId: string;
    allowOutOfStockSubscriptions: boolean;
    orderMinimumQuantity: number;
    orderMaximumQuantity: number;
    allowedQuantities?: any;
    notReturnable: boolean;
    disableBuyButton: boolean;
    disableWishlistButton: boolean;
    availableForPreOrder: boolean;
    preOrderDateTimeUtc?: any;
    callForPrice: boolean;
    price: number;
    oldPrice: number;
    catalogPrice: number;
    productCost: number;
    enteredPrice: boolean;
    minEnteredPrice: number;
    maxEnteredPrice: number;
    basepriceEnabled: boolean;
    basepriceAmount: number;
    basepriceUnitId: string;
    basepriceBaseAmount: number;
    basepriceBaseUnitId: string;
    unitId: string;
    markAsNew: boolean;
    markAsNewStartDateTimeUtc?: any;
    markAsNewEndDateTimeUtc?: any;
    weight: number;
    length: number;
    width: number;
    height: number;
    availableStartDateTimeUtc?: any;
    availableEndDateTimeUtc?: any;
    startPrice: number;
    auctionEnded: boolean;
    displayOrder: number;
    displayOrderCategory: number;
    displayOrderBrand: number;
    displayOrderCollection: number;
    published: boolean;
    createdOnUtc: Date;
    updatedOnUtc: Date;
    sold: number;
    viewed: number;
    onSale: number;
    flag?: any;
    productTags: any[];
    appliedDiscounts: any[];
    id: string;
    productCategories: ProductCategory[];
    productCollections: any[];
    productPictures: ProductPicture[];
    productSpecificationAttributes: any[];
    tierPrices: any[];
    productWarehouseInventory: any[];
    productAttributeMappings: any[];
    productAttributeCombinations: any[];
}


// Products Old Model
export interface Product {
    id?: number;
    title?: string;
    description?: string;
    type?: string;
    brand?: string;
    collection?: any[];
    category?: string;
    price?: number;
    oldPrice?: number;
    sale?: boolean;
    discount?: number;
    stock?: number;
    new?: boolean;
    quantity?: number;
    tags?: any[];
    variants?: Variants[];
    images?: Images[];
}

export interface Variants {
    variant_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    image_id?: number;
}

export interface Images {
    image_id?: number;
    id?: number;
    alt?: string;
    src?: string;
    variant_id?: any[];
}
