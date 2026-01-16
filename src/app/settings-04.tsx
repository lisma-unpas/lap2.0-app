"use client";

import { useState } from "react";
import { Zap } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { SectionFooter } from "@/components/application/section-footers/section-footer";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { SectionLabel } from "@/components/application/section-headers/section-label";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { InputBase, TextField } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { TextArea } from "@/components/base/textarea/textarea";

const tabs = [
    { id: "details", label: "My details" },
    { id: "profile", label: "Profile" },
    { id: "password", label: "Password" },
    { id: "team", label: "Team" },
    { id: "plan", label: "Plan" },
    { id: "billing", label: "Billing" },
    { id: "email", label: "Email" },
    { id: "notifications", label: "Notifications", badge: 2 },
    { id: "integrations", label: "Integrations" },
    { id: "api", label: "API" },
];

export const Settings04 = () => {
    const [selectedTab, setSelectedTab] = useState<string>("profile");
    const [uploadedAvatar, setUploadedAvatar] = useState<string | undefined>("https://www.untitledui.com/logos/images/untitledui.png");

    const [tagline, setTagline] = useState<string>(
        "Untitled UI is the ultimate Figma UI kit and design system. Kickstart any project and level up as a designer.",
    );

    const TAGLINE_MAX_LENGTH = 150;
    const taglineCharactersLeft = TAGLINE_MAX_LENGTH - tagline.length;

    const handleAvatarUpload = (file: File) => {
        console.log("File uploaded:", file);
        setUploadedAvatar(URL.createObjectURL(file));
    };

    return (
        <div className="bg-primary">
            <HeaderNavigationBase
                activeUrl="/settings-01"
                items={[
                    { label: "Home", href: "/" },
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Projects", href: "/projects" },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Users", href: "/users" },
                ]}
                trailingContent={
                    <Button iconLeading={Zap} color="secondary" size="sm">
                        Upgrade now
                    </Button>
                }
            />

            <main className="bg-primary pt-8 pb-16 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto flex w-full max-w-container flex-col gap-5 px-4 lg:px-8">
                        {/* Page header simple with search */}
                        <div className="relative flex flex-col gap-5 lg:border-b lg:border-secondary lg:pb-4">
                            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                                <div className="flex flex-col gap-0.5 lg:gap-1">
                                    <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Settings</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto flex w-full max-w-container gap-24 px-4 lg:px-8">
                        <Tabs
                            orientation="vertical"
                            className="hidden w-auto lg:flex"
                            selectedKey={selectedTab}
                            onSelectionChange={(value) => setSelectedTab(value as string)}
                        >
                            <TabList type="line" items={tabs} size="sm" />
                        </Tabs>

                        <Form
                            className="flex min-w-0 flex-1 flex-col gap-6"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const data = Object.fromEntries(new FormData(e.currentTarget));
                                console.log("Form data:", data);
                            }}
                        >
                            <SectionHeader.Root>
                                <SectionHeader.Group>
                                    <div className="flex flex-1 flex-col justify-center gap-0.5 self-stretch">
                                        <SectionHeader.Heading>Company profile</SectionHeader.Heading>
                                        <SectionHeader.Subheading>Update your company photo and details here.</SectionHeader.Subheading>
                                    </div>

                                    <SectionHeader.Actions>
                                        <Button color="secondary" size="md">
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary" size="md">
                                            Save
                                        </Button>
                                    </SectionHeader.Actions>
                                </SectionHeader.Group>
                            </SectionHeader.Root>

                            {/* Form content */}
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8">
                                    <SectionLabel.Root isRequired size="sm" title="Public profile" description="This will be displayed on your profile." />

                                    <div className="flex flex-col gap-4">
                                        <TextField isRequired aria-label="Name" name="name" defaultValue="Untitled UI">
                                            <InputBase size="md" />
                                        </TextField>

                                        <InputGroup
                                            isRequired
                                            aria-label="Username"
                                            name="username"
                                            size="md"
                                            defaultValue="untitled"
                                            leadingAddon={
                                                <InputGroup.Prefix>
                                                    <span className="max-lg:hidden">untitledui.com/profile/</span>
                                                    <span className="lg:hidden">untitledui.com/.../</span>
                                                </InputGroup.Prefix>
                                            }
                                        >
                                            <InputBase tooltip="This is a tooltip" />
                                        </InputGroup>
                                    </div>
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8">
                                    <SectionLabel.Root isRequired size="sm" title="Tagline" description="A quick snapshot of your company." />

                                    <TextArea
                                        isRequired
                                        aria-label="Tagline"
                                        rows={3}
                                        name="tagline"
                                        hint={`${taglineCharactersLeft} character${taglineCharactersLeft === 1 ? "" : "s"} left`}
                                        value={tagline}
                                        onChange={(value) => setTagline(value)}
                                        maxLength={TAGLINE_MAX_LENGTH}
                                        textAreaClassName="min-h-33.5 lg:min-h-25.5"
                                    />
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8">
                                    <SectionLabel.Root
                                        isRequired
                                        size="sm"
                                        title="Company logo"
                                        description="Update your company logo and then choose where you want it to display."
                                    />
                                    <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
                                        <div className="h-8 w-full max-w-35.5 lg:h-auto lg:pt-4">
                                            <img src={uploadedAvatar} alt="Company logo" className="w-full" />
                                        </div>

                                        <FileUpload.DropZone className="w-full" onDropFiles={(files) => handleAvatarUpload(files[0])} />
                                    </div>
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8">
                                    <SectionLabel.Root size="sm" title="Branding" description="Add your logo to reports and emails.">
                                        <SectionLabel.Actions>
                                            <Button size="md" color="link-color">
                                                View examples
                                            </Button>
                                        </SectionLabel.Actions>
                                    </SectionLabel.Root>

                                    <div className="flex flex-col gap-4">
                                        <Checkbox defaultSelected label="Reports" hint="Include my logo in summary reports." size="sm" />
                                        <Checkbox defaultSelected label="Emails" hint="Include my logo in customer emails." size="sm" />
                                    </div>
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(200px,280px)_minmax(400px,512px)] lg:gap-8">
                                    <SectionLabel.Root size="sm" title="Social profiles" />

                                    <div className="flex flex-col gap-4">
                                        <InputGroup
                                            aria-label="Twitter"
                                            name="twitter"
                                            size="md"
                                            defaultValue="untitledui"
                                            leadingAddon={<InputGroup.Prefix>twitter.com/</InputGroup.Prefix>}
                                        >
                                            <InputBase />
                                        </InputGroup>

                                        <InputGroup
                                            aria-label="Facebook"
                                            name="facebook"
                                            size="md"
                                            defaultValue="untitledui"
                                            leadingAddon={<InputGroup.Prefix>facebook.com/</InputGroup.Prefix>}
                                        >
                                            <InputBase />
                                        </InputGroup>

                                        <InputGroup
                                            aria-label="LinkedIn"
                                            name="linkedin"
                                            size="md"
                                            defaultValue="untitledui"
                                            leadingAddon={<InputGroup.Prefix>linkedin.com/company/</InputGroup.Prefix>}
                                        >
                                            <InputBase />
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>

                            <SectionFooter.Root>
                                <SectionFooter.Actions>
                                    <Button color="secondary" size="md">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary" size="md">
                                        Save
                                    </Button>
                                </SectionFooter.Actions>
                            </SectionFooter.Root>
                        </Form>
                    </div>
                </div>
            </main>
        </div>
    );
};
