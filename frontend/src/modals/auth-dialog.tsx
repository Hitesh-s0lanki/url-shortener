import LoginForm from "@/components/forms/login-form";
import RegisterForm from "@/components/forms/register-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RootState } from "@/store";
import { closeDialog } from "@/store/slices/uiSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthModal = () => {
  const [register, setRegister] = useState(true);

  const open = useSelector((s: RootState) => s.ui.dialogs.login);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeDialog("login"));

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {register ? (
          <RegisterForm setRegister={setRegister} />
        ) : (
          <LoginForm setRegister={setRegister} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
