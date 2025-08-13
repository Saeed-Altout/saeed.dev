import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Mail, Menu, LogIn, Download, Home } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SettingsDialog } from "@/components/dialog/settings-dialog";
import { ListItem } from "@/components/ui/list-item";
import { Logo } from "@/components/common/logo";

import { downloadFile } from "@/lib/utils";
import { portfolioSections } from "@/constants/content";
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";

export function Navbar() {
  const { onOpen } = useModalStore();
  const { user, token } = useAuthStore();
  const isAuthenticated = !!(user && token);

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleCloseSheet = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  const handleDownloadCV = useCallback(() => {
    const cvPath = "/cv.pdf";
    downloadFile(cvPath, "Saeed_Al-Tout_CV.pdf");
    handleCloseSheet();
  }, [handleCloseSheet]);

  const handleSignIn = useCallback(() => {
    onOpen("auth");
    handleCloseSheet();
  }, [onOpen, handleCloseSheet]);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-12 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Portfolio</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 w-[400px] lg:w-[500px] lg:grid-cols-2 p-4">
                    {portfolioSections.map((section) => (
                      <ListItem
                        key={section.title}
                        title={section.title}
                        href={section.href}
                        icon={section.icon}
                      >
                        {section.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated && (
            <Button size="sm" onClick={handleDownloadCV}>
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          )}
          {!isAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpen("auth")}
              className="flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
          )}
          {isAuthenticated && <SettingsDialog />}
        </div>

        <div className="lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 px-4">
                <Link
                  to="/"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={handleCloseSheet}
                >
                  <Home className="w-4 h-4" />
                  <div>
                    <div className="font-medium">Home</div>
                    <div className="text-xs text-muted-foreground">
                      Back to homepage
                    </div>
                  </div>
                </Link>

                {portfolioSections.map((section) => (
                  <Link
                    key={section.title}
                    to={section.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    onClick={handleCloseSheet}
                  >
                    {section.icon && <section.icon className="w-4 h-4" />}
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {section.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </nav>
              <SheetFooter>
                <Link
                  to="/contact"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={handleCloseSheet}
                >
                  <Mail className="w-4 h-4" />
                  <div>
                    <div className="font-medium">Contact</div>
                    <div className="text-xs text-muted-foreground">
                      Get in touch with me
                    </div>
                  </div>
                </Link>
                {isAuthenticated && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadCV}
                    className="flex items-center gap-2 mt-4"
                  >
                    <Download className="w-4 h-4" />
                    Download CV
                  </Button>
                )}
                {!isAuthenticated && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignIn}
                    className="flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
