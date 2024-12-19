/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An arbitrary precision signed decimal */
  BigDecimal: { input: any; output: any; }
  /** A 64-bit signed integer */
  Long: { input: any; output: any; }
  /** An RFC-3339 compliant Full Time Scalar */
  Time: { input: any; output: any; }
  /** A universally unique identifier compliant UUID Scalar */
  UUID: { input: any; output: any; }
};

export type ActivateUserAccountInput = {
  activationCode: Scalars['UUID']['input'];
};

export type AddCategoryInput = {
  name: Scalars['String']['input'];
  nonEnglishName?: InputMaybe<Scalars['String']['input']>;
  storeCorrelationId: Scalars['UUID']['input'];
};

export type AddItemInput = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  categoryCorrelationId: Scalars['UUID']['input'];
  englishDescription?: InputMaybe<Scalars['String']['input']>;
  englishName: Scalars['String']['input'];
  itemOptionInputList?: InputMaybe<Array<InputMaybe<AddItemOptionInput>>>;
  nonEnglishDescription?: InputMaybe<Scalars['String']['input']>;
  nonEnglishName?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['String']['input'];
  tag?: InputMaybe<Scalars['String']['input']>;
  taxRate: Scalars['String']['input'];
};

export type AddItemOptionElementInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  itemOptionCorrelationId?: InputMaybe<Scalars['UUID']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['String']['input'];
  renderSequence: Scalars['Int']['input'];
};

export type AddItemOptionInput = {
  addItemOptionElementInputList?: InputMaybe<Array<InputMaybe<AddItemOptionElementInput>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  isRequired: Scalars['Boolean']['input'];
  itemCorrelationId?: InputMaybe<Scalars['UUID']['input']>;
  name: Scalars['String']['input'];
  renderSequence: Scalars['Int']['input'];
};

export type AddressInput = {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  state: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export enum BillingFrequency {
  Monthly = 'MONTHLY',
  Yearly = 'YEARLY'
}

export enum ComboRepeatFrequency {
  None = 'NONE',
  Onetime = 'ONETIME',
  Weekly = 'WEEKLY'
}

export type CreateCategoryPreSignedUrlInput = {
  categoryCorrelationId: Scalars['UUID']['input'];
  categoryName: Scalars['String']['input'];
  fileNameExtension: Scalars['String']['input'];
  storeCorrelationId: Scalars['UUID']['input'];
  storeUserCorrelationId: Scalars['UUID']['input'];
};

export type CreateComboInput = {
  comboReadyTime?: InputMaybe<Scalars['Long']['input']>;
  comboRepeatFrequency?: InputMaybe<ComboRepeatFrequency>;
  deadlineToPlaceOrder?: InputMaybe<Scalars['Long']['input']>;
  englishDescription?: InputMaybe<Scalars['String']['input']>;
  englishName: Scalars['String']['input'];
  itemCorrelationIds?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nonEnglishDescription?: InputMaybe<Scalars['String']['input']>;
  nonEnglishName?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['String']['input'];
  storeCorrelationId: Scalars['UUID']['input'];
  taxRate: Scalars['String']['input'];
};

export type CreateComboPreSignedUrlInput = {
  comboCorrelationId: Scalars['UUID']['input'];
  comboName: Scalars['String']['input'];
  fileNameExtension: Scalars['String']['input'];
  storeCorrelationId: Scalars['UUID']['input'];
  storeUserCorrelationId: Scalars['UUID']['input'];
};

export type CreateCombosInput = {
  createComboInputs: Array<CreateComboInput>;
  storeCorrelationId: Scalars['UUID']['input'];
  storeUserCorrelationId: Scalars['UUID']['input'];
};

export type CreateCustomerOrderInput = {
  customerCorrelationId: Scalars['UUID']['input'];
  customerEmail?: InputMaybe<Scalars['String']['input']>;
  customerFirstName?: InputMaybe<Scalars['String']['input']>;
  customerLastName?: InputMaybe<Scalars['String']['input']>;
  customerNote?: InputMaybe<Scalars['String']['input']>;
  customerPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  isGuest?: InputMaybe<Scalars['Boolean']['input']>;
  orderItems: Array<OrderItemInput>;
  orderType?: InputMaybe<OrderTypeEnum>;
  serverEmployeeCorrelationId?: InputMaybe<Scalars['UUID']['input']>;
  serverFirstName?: InputMaybe<Scalars['String']['input']>;
  serverLastName?: InputMaybe<Scalars['String']['input']>;
  storeCorrelationId: Scalars['String']['input'];
  tableNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateItemPreSignedUrlInput = {
  categoryName: Scalars['String']['input'];
  fileNameExtension: Scalars['String']['input'];
  itemCorrelationId: Scalars['UUID']['input'];
  itemName: Scalars['String']['input'];
  storeCorrelationId: Scalars['UUID']['input'];
  storeUserCorrelationId: Scalars['UUID']['input'];
};

export type CreatePromotionCodeInput = {
  isExistingCustomer: Scalars['Boolean']['input'];
  maxRedemptions: Scalars['Long']['input'];
  percentOff: Scalars['BigDecimal']['input'];
  promotionExpiry: Scalars['Long']['input'];
  storeCorrelationId: Scalars['UUID']['input'];
  userEmails: Array<Scalars['String']['input']>;
};

export type CreateReviewInput = {
  authorId?: InputMaybe<Scalars['UUID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  replyTo?: InputMaybe<Scalars['UUID']['input']>;
  storeCorrelationId?: InputMaybe<Scalars['UUID']['input']>;
};

export type CreateStoreEmployeeInput = {
  email: Scalars['String']['input'];
  employerName: Scalars['String']['input'];
  employerStoreCorrelationId: Scalars['UUID']['input'];
  firstName: Scalars['String']['input'];
  hostName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  roles: Array<InputMaybe<RoleEnum>>;
};

export type CreateStoreInput = {
  address: AddressInput;
  name: Scalars['String']['input'];
  nonEnglishName?: InputMaybe<Scalars['String']['input']>;
  operationHours?: InputMaybe<Array<InputMaybe<OperationHourInput>>>;
  primaryContactEmail: Scalars['String']['input'];
  primaryContactFirstName: Scalars['String']['input'];
  primaryContactLastName: Scalars['String']['input'];
  primaryContactPhoneNumber: Scalars['String']['input'];
  storeUserCorrelationId: Scalars['UUID']['input'];
  style?: InputMaybe<Scalars['String']['input']>;
};

export type CreateStorePreSignedUrlInput = {
  fileNameExtension: Scalars['String']['input'];
  storeCorrelationId: Scalars['UUID']['input'];
  storeName: Scalars['String']['input'];
  storeUserCorrelationId: Scalars['UUID']['input'];
};

export type CreateStoreTableInput = {
  storeCorrelationId: Scalars['UUID']['input'];
  tableNumber: Scalars['Int']['input'];
  tableSize: Scalars['Int']['input'];
};

export type CreateStoreUserInput = {
  email: Scalars['String']['input'];
  employerName: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  hostName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type CreateStoreUserPreSignedUrlInput = {
  fileNameExtension: Scalars['String']['input'];
  storeUserCorrelationId: Scalars['UUID']['input'];
};

export type CreateUserInput = {
  address?: InputMaybe<AddressInput>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  hostName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserPreSignedUrlInput = {
  fileNameExtension: Scalars['String']['input'];
  userCorrelationId: Scalars['UUID']['input'];
};

export type CustomerOrdersByCustomerCorrelationIdInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  customerCorrelationId: Scalars['UUID']['input'];
  endTimeInEpochMilli?: InputMaybe<Scalars['Long']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  startTimeInEpochMilli?: InputMaybe<Scalars['Long']['input']>;
};

export type DeleteReviewInput = {
  commentCorrelationId?: InputMaybe<Scalars['UUID']['input']>;
};

export type GetSalesHistoryInput = {
  requestedHours: Scalars['Int']['input'];
  storeCorrelationId: Scalars['UUID']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type OperationHourInput = {
  day?: InputMaybe<Scalars['String']['input']>;
  endHour?: InputMaybe<Scalars['Long']['input']>;
  startHour?: InputMaybe<Scalars['Long']['input']>;
};

export type OrderItemInput = {
  isCombo: Scalars['Boolean']['input'];
  itemCorrelationId: Scalars['UUID']['input'];
  itemOptionElements?: InputMaybe<Scalars['String']['input']>;
  quantity: Scalars['Int']['input'];
};

export enum OrderStatusEnum {
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Voided = 'VOIDED'
}

export enum OrderTypeEnum {
  Delivery = 'DELIVERY',
  DineIn = 'DINE_IN',
  PickUp = 'PICK_UP'
}

export type RefreshAccessTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  email: Scalars['String']['input'];
  hostName: Scalars['String']['input'];
};

export type RestaurantSubscriptionTabDataInput = {
  clientBaseUrl: Scalars['String']['input'];
  storeCorrelationId: Scalars['UUID']['input'];
};

export type RetrieveCombosInput = {
  comboCorrelationIds: Array<Scalars['UUID']['input']>;
};

export type RetrieveItemsInput = {
  iItemCorrelationIds: Array<Scalars['UUID']['input']>;
};

export type RetrieveOrdersInput = {
  customerOrderIds: Array<Scalars['ID']['input']>;
};

export type RetrieveStoresInput = {
  storeCorrelationIds: Array<Scalars['UUID']['input']>;
};

export enum RoleEnum {
  RoleAdmin = 'ROLE_ADMIN',
  RoleEmployeeManager = 'ROLE_EMPLOYEE_MANAGER',
  RoleEmployeeRegular = 'ROLE_EMPLOYEE_REGULAR',
  RoleUser = 'ROLE_USER'
}

export type SaveNewPasswordInput = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type StoreEmployeeSignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum StoreTableStatusEnum {
  Available = 'AVAILABLE',
  InUse = 'IN_USE',
  Reserved = 'RESERVED'
}

export type StoreUserSignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum StripeInvoiceStatus {
  Draft = 'DRAFT',
  Open = 'OPEN',
  Paid = 'PAID',
  Uncollectible = 'UNCOLLECTIBLE',
  Void = 'VOID'
}

export enum StripeProduct {
  PremiumMonthly = 'PREMIUM_MONTHLY',
  PremiumYearly = 'PREMIUM_YEARLY',
  ProMonthly = 'PRO_MONTHLY',
  ProYearly = 'PRO_YEARLY',
  StarterMonthly = 'STARTER_MONTHLY',
  StarterYearly = 'STARTER_YEARLY'
}

export enum StripeSubscriptionStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Incomplete = 'INCOMPLETE',
  IncompleteExpired = 'INCOMPLETE_EXPIRED',
  PastDue = 'PAST_DUE',
  Trailing = 'TRAILING',
  Unpaid = 'UNPAID'
}

export type UpdateCategoryInput = {
  categoryCorrelationId: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nonEnglishName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateComboInput = {
  comboCorrelationId: Scalars['UUID']['input'];
  comboReadyTime?: InputMaybe<Scalars['Long']['input']>;
  comboRepeatFrequency?: InputMaybe<ComboRepeatFrequency>;
  deadlineToPlaceOrder?: InputMaybe<Scalars['Long']['input']>;
  englishDescription?: InputMaybe<Scalars['String']['input']>;
  englishName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  itemCorrelationIds?: InputMaybe<Array<InputMaybe<Scalars['UUID']['input']>>>;
  nonEnglishDescription?: InputMaybe<Scalars['String']['input']>;
  nonEnglishName?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  taxRate?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerOrderInput = {
  appUserCorrelationId: Scalars['UUID']['input'];
  customerEmail?: InputMaybe<Scalars['String']['input']>;
  customerFirstName?: InputMaybe<Scalars['String']['input']>;
  customerLastName?: InputMaybe<Scalars['String']['input']>;
  customerNote?: InputMaybe<Scalars['String']['input']>;
  customerOrderCorrelationId: Scalars['UUID']['input'];
  customerPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  isGuest?: InputMaybe<Scalars['Boolean']['input']>;
  orderItems?: InputMaybe<Array<InputMaybe<OrderItemInput>>>;
  orderStatus?: InputMaybe<OrderStatusEnum>;
  orderType?: InputMaybe<OrderTypeEnum>;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  serverEmployeeCorrelationId?: InputMaybe<Scalars['UUID']['input']>;
  serverFirstName?: InputMaybe<Scalars['String']['input']>;
  serverLastName?: InputMaybe<Scalars['String']['input']>;
  storeCorrelationId: Scalars['UUID']['input'];
  tableNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateItemInput = {
  abbreviation?: InputMaybe<Scalars['String']['input']>;
  bucketKeyName?: InputMaybe<Scalars['String']['input']>;
  englishDescription?: InputMaybe<Scalars['String']['input']>;
  englishName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  itemCorrelationId: Scalars['UUID']['input'];
  nonEnglishDescription?: InputMaybe<Scalars['String']['input']>;
  nonEnglishName?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  printer?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  taxRate?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateItemOptionElementInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  itemOptionElementCorrelationId: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  renderSequence?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateItemOptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
  itemOptionCorrelationId: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  renderSequence?: InputMaybe<Scalars['Int']['input']>;
  updateItemOptionElementInputList?: InputMaybe<Array<InputMaybe<UpdateItemOptionElementInput>>>;
};

export type UpdateRegularUserInput = {
  address?: InputMaybe<AddressInput>;
  appUserCorrelationId: Scalars['UUID']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStoreEmployeeInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  employeeCorrelationId: Scalars['UUID']['input'];
  employerName?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<InputMaybe<RoleEnum>>>;
};

export type UpdateStoreInput = {
  address?: InputMaybe<AddressInput>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nonEnglishName?: InputMaybe<Scalars['String']['input']>;
  operationHours?: InputMaybe<Array<InputMaybe<OperationHourInput>>>;
  primaryContactEmail?: InputMaybe<Scalars['String']['input']>;
  primaryContactFirstName?: InputMaybe<Scalars['String']['input']>;
  primaryContactLastName?: InputMaybe<Scalars['String']['input']>;
  primaryContactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  storeCorrelationId: Scalars['UUID']['input'];
  style?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStoreTableInput = {
  customerOrderCorrelationId?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<StoreTableStatusEnum>;
  storeCorrelationId: Scalars['UUID']['input'];
  storeTableCorrelationId: Scalars['UUID']['input'];
  tableNumber?: InputMaybe<Scalars['Int']['input']>;
  tableSize?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateStoreUserInput = {
  correlationId: Scalars['UUID']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  employerName?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};
