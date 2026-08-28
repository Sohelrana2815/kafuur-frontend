// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { updateUserByAdmin } from "@/services/user/user.service";
// import { IUser } from "@/types/user.interface";
// import { useActionState, useEffect } from "react";
// import { toast } from "sonner";

// interface IUserFormDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
//   user: IUser;
// }

// export default function UserFormDialog({
//   open,
//   onClose,
//   onSuccess,
//   user,
// }: IUserFormDialogProps) {
//   // const [state, formAction, pending] = useActionState(
//   //   updateUserByAdmin.bind(null, user.id!),
//   //   null,
//   // );

//   console.log("State from Product form:", state);
//   // isEdit ? updateProduct.bind(null, product.id!) :

//   const getFieldError = (fieldName: string) => {
//     if (state && state.errors) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const error = state.errors.find((err: any) => err.field === fieldName);
//       return error?.message;
//     } else {
//       return null;
//     }
//   };
//   useEffect(() => {
//     if (!state) return;

//     if (state.success) {
//       toast.success(state.message || "User updated successfully");

//       onSuccess();
//       onClose();
//     } else if (state.message) {
//       toast.error(state.message);
//     }
//   }, [state, onSuccess, onClose]);

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-h-[90vh] flex flex-col p-0">
//         <DialogHeader className="px-6 pt-6 pb-4">
//           <DialogTitle>Edit User</DialogTitle>
//         </DialogHeader>

//         <form action={formAction} className="flex min-h-0 flex-1 flex-col">
//           <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-4">
//             {/* Name */}
//             <Field>
//               <FieldLabel htmlFor="name">Name</FieldLabel>

//               <Input
//                 id="name"
//                 name="name"
//                 placeholder="User name"
//                 defaultValue={user.name ?? ""}
//               />

//               {getFieldError("name") && (
//                 <FieldDescription className="text-destructive">
//                   {getFieldError("name")}
//                 </FieldDescription>
//               )}
//             </Field>

//             {/* Phone */}
//             <Field>
//               <FieldLabel htmlFor="phone">Phone</FieldLabel>

//               <Input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 placeholder="01XXXXXXXXX"
//                 defaultValue={user.phone ?? ""}
//               />

//               {getFieldError("phone") && (
//                 <FieldDescription className="text-destructive">
//                   {getFieldError("phone")}
//                 </FieldDescription>
//               )}
//             </Field>

//             {/* Alternative Phone */}
//             <Field>
//               <FieldLabel htmlFor="altPhone">Alternative Phone</FieldLabel>

//               <Input
//                 id="altPhone"
//                 name="altPhone"
//                 type="tel"
//                 placeholder="Alternative phone number"
//                 defaultValue={user.altPhone ?? ""}
//               />

//               {getFieldError("altPhone") && (
//                 <FieldDescription className="text-destructive">
//                   {getFieldError("altPhone")}
//                 </FieldDescription>
//               )}
//             </Field>

//             {/* Address */}
//             <Field>
//               <FieldLabel htmlFor="address">Address</FieldLabel>

//               <Input
//                 id="address"
//                 name="address"
//                 placeholder="Full address"
//                 defaultValue={user.address ?? ""}
//               />

//               {getFieldError("address") && (
//                 <FieldDescription className="text-destructive">
//                   {getFieldError("address")}
//                 </FieldDescription>
//               )}
//             </Field>

//             {/* City */}
//             <Field>
//               <FieldLabel htmlFor="city">City</FieldLabel>

//               <Input
//                 id="city"
//                 name="city"
//                 placeholder="City"
//                 defaultValue={user.city ?? ""}
//               />

//               {getFieldError("city") && (
//                 <FieldDescription className="text-destructive">
//                   {getFieldError("city")}
//                 </FieldDescription>
//               )}
//             </Field>

//             {/* Thana */}
//             <Field>
//               <FieldLabel htmlFor="thana">Thana</FieldLabel>

//               <Input
//                 id="thana"
//                 name="thana"
//                 placeholder="Thana"
//                 defaultValue={user.thana ?? ""}
//               />

//               {getFieldError("thana") && (
//                 <FieldDescription className="text-destructive">
//                   {getFieldError("thana")}
//                 </FieldDescription>
//               )}
//             </Field>

//             {/* Role */}
//             <Field>
//               <FieldLabel htmlFor="role">Role</FieldLabel>

//               <input type="hidden" name="role" value={user.role} />

//               <Select
//                 defaultValue={user.role}
//                 onValueChange={() => {
//                   // The hidden input is static here.
//                   // For a controlled Select, use state.
//                 }}
//               >
//                 <SelectTrigger id="role">
//                   <SelectValue placeholder="Select role" />
//                 </SelectTrigger>

//                 <SelectContent>
//                   <SelectItem value="CUSTOMER">Customer</SelectItem>

//                   <SelectItem value="ADMIN">Admin</SelectItem>
//                 </SelectContent>
//               </Select>

//               {getFieldError("role") && (
//                 <FieldDescription className="text-destructive">
//                   {getFieldError("role")}
//                 </FieldDescription>
//               )}
//             </Field>

//             {/* Status */}
//             <Field>
//               <FieldLabel htmlFor="status">Status</FieldLabel>

//               <input type="hidden" name="status" value={user.status} />

//               <Select defaultValue={user.status}>
//                 <SelectTrigger id="status">
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>

//                 <SelectContent>
//                   <SelectItem value="ACTIVE">Active</SelectItem>

//                   <SelectItem value="BLOCKED">Blocked</SelectItem>

//                   <SelectItem value="BANNED">Banned</SelectItem>

//                   <SelectItem value="DELETED">Deleted</SelectItem>
//                 </SelectContent>
//               </Select>

//               {getFieldError("status") && (
//                 <FieldDescription className="text-destructive">
//                   {getFieldError("status")}
//                 </FieldDescription>
//               )}
//             </Field>

//             {/* Verification */}
//             <Field>
//               <FieldLabel htmlFor="isVerified">Verification</FieldLabel>

//               <input
//                 type="hidden"
//                 name="isVerified"
//                 value={user.isVerified ? "true" : "false"}
//               />

//               <Select defaultValue={user.isVerified ? "true" : "false"}>
//                 <SelectTrigger id="isVerified">
//                   <SelectValue placeholder="Select verification status" />
//                 </SelectTrigger>

//                 <SelectContent>
//                   <SelectItem value="true">Verified</SelectItem>

//                   <SelectItem value="false">Not Verified</SelectItem>
//                 </SelectContent>
//               </Select>

//               {getFieldError("isVerified") && (
//                 <FieldDescription className="text-destructive">
//                   {getFieldError("isVerified")}
//                 </FieldDescription>
//               )}
//             </Field>
//           </div>

//           {/* Footer */}
//           <div className="flex justify-end gap-2 border-t px-6 py-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onClose}
//               disabled={pending}
//             >
//               Cancel
//             </Button>

//             <Button type="submit" disabled={pending}>
//               {pending ? "Updating..." : "Update User"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
