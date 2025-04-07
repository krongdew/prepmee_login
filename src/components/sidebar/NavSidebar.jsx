"use client";
import React, { useState, useEffect } from 'react';
import navigation from "@/data/navigation";
import { isActiveNavigation } from "@/utils/isActiveNavigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

export default function NavSidebar() {
  const path = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ฟังก์ชันสำหรับตรวจสอบว่าเส้นทางถูกเลือกหรือไม่
  const isActiveRoute = (itemPath) => {
    return itemPath === path || itemPath === path.replace(/\/\d+$/, "");
  };

  // ถ้ายังไม่ได้โหลดให้ return null เพื่อป้องกัน hydration error
  if (!isMounted) {
    return null;
  }

  return (
    <div 
      className="offcanvas offcanvas-start" 
      tabIndex={-1} 
      id="offcanvasExample" 
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header border-bottom">
        <Link href="/">
          <Image
            alt="Header Logo"
            width="133"
            height="40"
            src="/images/header-logo2.svg"
          />
        </Link>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <div className="ui-navigation-sidebar">
          <Sidebar>
            <Menu>
              {navigation.map((item, i) =>
                item?.children ? (
                  <SubMenu
                    key={i}
                    label={item.name}
                    className={
                      isMounted && isActiveNavigation(path, item) 
                        ? "ui-mobile-active" 
                        : ""
                    }
                  >
                    {item.children.map((item2, i2) =>
                      item2?.children ? (
                        <SubMenu
                          key={i2}
                          label={item2.name}
                          className={
                            isMounted && isActiveNavigation(path, item2)
                              ? "ui-mobile-active"
                              : ""
                          }
                        >
                          {item2.children.map((item3, i3) => (
                            <MenuItem
                              key={i3}
                              component={<Link href={item3.path} />}
                              className={
                                isMounted && isActiveRoute(item3.path)
                                  ? "ui-mobile-active"
                                  : ""
                              }
                            >
                              <span data-bs-dismiss="offcanvas">
                                {item3.name}
                              </span>
                            </MenuItem>
                          ))}
                        </SubMenu>
                      ) : (
                        <MenuItem
                          key={i2}
                          component={<Link href={item2.path} />}
                          className={
                            isMounted && isActiveRoute(item2.path)
                              ? "ui-mobile-active"
                              : ""
                          }
                        >
                          <span data-bs-dismiss="offcanvas">
                            {item2.name}
                          </span>
                        </MenuItem>
                      )
                    )}
                  </SubMenu>
                ) : (
                  <MenuItem
                    key={i}
                    component={<Link href={item.path} />}
                    className={
                      isMounted && isActiveRoute(item.path)
                        ? "ui-mobile-active"
                        : ""
                    }
                  >
                    <span data-bs-dismiss="offcanvas">{item.name}</span>
                  </MenuItem>
                )
              )}
            </Menu>
          </Sidebar>
        </div>
      </div>
    </div>
  );
}