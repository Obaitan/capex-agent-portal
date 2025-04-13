// import { FC, ReactNode, useState } from "react";
// import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

// type UseModal = {
// 	title?: string;
// 	onClose?: () => void;
// 	onOpen?: () => void;
// };

// export type UseModalReturn = [
// 	FC<{ children: ReactNode }>,
// 	() => void,
// 	() => void
// ];
// export const useModal = ({
// 	title,
// 	onClose,
// 	onOpen,
// }: UseModal): UseModalReturn => {
// 	const [open, setOpen] = useState(false);

// 	const openModal = () => {
// 		setOpen(!open);
// 		onOpen && onOpen();
// 	};

// 	const closeModal = () => {
// 		setOpen(false);
// 		onClose && onClose();
// 	};

// 	const ModalContent = ({ children }: { children: ReactNode }) => (
// 		<Dialog open={open} handler={openModal}>
// 			{title && <DialogHeader>{title}</DialogHeader>}
// 			<DialogBody>{children}</DialogBody>
// 		</Dialog>
// 	);

// 	return [ModalContent, openModal, closeModal];
// };
