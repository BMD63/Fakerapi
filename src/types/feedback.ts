export interface FeedbackFormState {
    fio: string;
    phone : string;
    email: string;
    date: string | null;
    comment: string;
}
export interface FeedbackFormModal{
    fio: string;
    phone: string;
    email: string;
    date: string;
    comment: string;
    userId?: number;
    birthday?: string;
} 