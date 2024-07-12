import { Icon } from "@iconify-icon/react";
import { motion } from "framer-motion";
import type { FC } from "react";

export const AnimatedArrow: FC = () => (
    <motion.span
        className="inline-block ml-1"
        initial={{ x: 0 }}
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
        <Icon icon="tabler:arrow-right" className="size-4" width="none" />
    </motion.span>
);
