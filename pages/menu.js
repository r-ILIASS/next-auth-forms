import React from "react";
import Link from "next/link";

const menu = () => {
    return (
        <div>
            <Link href="/employees">
                <a>employees</a>
            </Link>
        </div>
    );
};

export default menu;
