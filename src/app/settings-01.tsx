"use client";

import { useState } from "react";
import { ArrowLeft, HomeLine, Mail01, Zap } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { Breadcrumbs } from "@/components/application/breadcrumbs/breadcrumbs";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { SectionFooter } from "@/components/application/section-footers/section-footer";
import { SectionLabel } from "@/components/application/section-headers/section-label";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { InputBase, TextField } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { TextEditor } from "@/components/base/text-editor/text-editor";
import { countriesOptions } from "@/utils/countries";
import { timezonesOptionsWithLongName } from "@/utils/timezones";

export const Settings01 = () => {
    const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);

    const handleAvatarUpload = (file: File) => {
        console.log("File uploaded:", file);
        setUploadedAvatar(URL.createObjectURL(file));
    };

    return (
        <div className="bg-primary">
            <HeaderNavigationBase
                hideBorder
                activeUrl="/settings-01"
                items={[
                    { label: "Home", href: "/" },
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Projects", href: "/projects" },
                    { label: "Tasks", href: "/tasks" },
                    { label: "Reporting", href: "/reporting" },
                    { label: "Users", href: "/users" },
                ]}
                subItems={[
                    { label: "My details", href: "#" },
                    { label: "Profile", href: "#", current: true },
                    { label: "Password", href: "#" },
                    { label: "Team", href: "#" },
                    { label: "Billing", href: "#" },
                    { label: "Notifications", href: "#" },
                ]}
                trailingContent={
                    <Button iconLeading={Zap} color="secondary" size="sm">
                        Upgrade now
                    </Button>
                }
            />

            <main className="bg-primary pb-16 lg:pb-24">
                <div className="flex flex-col gap-8 lg:gap-12">
                    {/* Page header banner avatar */}
                    <div className="relative flex flex-col">
                        <div className="px-1 pt-1">
                            <img
                                src="https://www.untitledui.com/application/plants.webp"
                                alt="Profile header background with plants"
                                className="size-full h-40 w-full rounded-xl object-cover lg:h-60"
                            />
                        </div>

                        <div className="mx-auto -mt-12 w-full max-w-container px-4 lg:-mt-10 lg:px-8">
                            <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
                                <div className="flex justify-between">
                                    <AvatarProfilePhoto
                                        verified
                                        className="lg:hidden"
                                        size="md"
                                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                        alt="Olivia Rhye"
                                    />
                                    <AvatarProfilePhoto
                                        verified
                                        className="hidden lg:flex"
                                        size="lg"
                                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                        alt="Olivia Rhye"
                                    />

                                    <div className="flex self-end lg:hidden">
                                        <Button color="link-gray" size="md" href="#" className="translate-y-2" iconLeading={ArrowLeft}>
                                            Back
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex w-full flex-col gap-4 lg:pt-16">
                                    <div className="max-lg:hidden">
                                        <Breadcrumbs type="button">
                                            <Breadcrumbs.Item href="#" icon={HomeLine} />
                                            <Breadcrumbs.Item href="#">Settings</Breadcrumbs.Item>
                                            <Breadcrumbs.Item href="#">Profile</Breadcrumbs.Item>
                                        </Breadcrumbs>
                                    </div>

                                    <div className="flex flex-col justify-between gap-4 lg:flex-row">
                                        <div className="flex flex-col gap-0.5 lg:gap-1">
                                            <h1 className="text-xl font-semibold text-primary lg:text-display-xs">Olivia Rhye</h1>
                                            <p className="text-md text-tertiary">@olivia</p>
                                        </div>
                                        <div className="flex flex-col gap-4 group-aria-pressed/field:inset-2 lg:flex-row">
                                            <div className="flex items-start gap-3">
                                                <Button color="secondary" size="md">
                                                    Cancel
                                                </Button>
                                                <Button size="md">Save</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto w-full max-w-container px-4 lg:px-8">
                        <Form
                            className="flex w-full flex-col gap-6 lg:mx-auto lg:max-w-160"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const data = Object.fromEntries(new FormData(e.currentTarget));
                                console.log("Form data:", data);
                            }}
                        >
                            {/* Form content */}
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                                    <TextField isRequired name="firstName" defaultValue="Olivia">
                                        <Label>First name</Label>
                                        <InputBase size="md" />
                                    </TextField>
                                    <TextField isRequired name="lastName" defaultValue="Rhye">
                                        <Label>Last name</Label>
                                        <InputBase size="md" />
                                    </TextField>
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <TextField isRequired name="email" type="email" className="max-w-lg" defaultValue="olivia@untitledui.com">
                                    <Label>Email address</Label>
                                    <InputBase size="md" icon={Mail01} />
                                </TextField>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <div className="flex flex-col gap-5 lg:flex-row">
                                    <Avatar size="2xl" src={uploadedAvatar || "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"} />

                                    <FileUpload.DropZone className="w-full" onDropFiles={(files) => handleAvatarUpload(files[0])} />
                                </div>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <TextField isRequired name="role" className="max-w-lg" defaultValue="Product Designer">
                                    <Label>Role</Label>
                                    <InputBase size="md" />
                                </TextField>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <Select name="country" label="Country" size="md" defaultSelectedKey="AU" items={countriesOptions} className="max-w-lg">
                                    {(item) => (
                                        <Select.Item id={item.id} icon={item.icon}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <Select
                                    name="timezone"
                                    label="Timezone"
                                    size="md"
                                    defaultSelectedKey={timezonesOptionsWithLongName.find((item) => item.label?.includes("PST"))?.id}
                                    items={timezonesOptionsWithLongName}
                                    className="max-w-lg"
                                >
                                    {(item) => (
                                        <Select.Item id={item.id} avatarUrl={item.avatarUrl} supportingText={item.supportingText} icon={item.icon}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <SectionLabel.Root
                                    isRequired
                                    size="sm"
                                    title="Your bio"
                                    description="Write a short introduction."
                                    tooltip="This will be public"
                                />

                                <TextEditor.Root
                                    limit={400}
                                    className="max-lg:gap-2"
                                    inputClassName="min-h-73 lg:min-h-70 resize-y max-lg:p-4"
                                    content="I'm a Product Designer based in Melbourne, Australia. I specialize in UX/UI design, brand strategy, and Webflow development."
                                >
                                    <TextEditor.Toolbar type="simple" className="lg:hidden" />
                                    <TextEditor.Toolbar type="advanced" className="flex-col! items-start! gap-2! max-lg:hidden" />

                                    <div className="flex flex-col gap-1.5">
                                        <TextEditor.Content />
                                        <TextEditor.HintText />
                                    </div>
                                </TextEditor.Root>

                                <hr className="h-px w-full border-none bg-border-secondary" />

                                <div className="flex flex-col gap-5">
                                    <SectionLabel.Root size="sm" title="Portfolio projects" description="Share a few snippets of your work." />

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                                        <img
                                            src="https://www.untitledui.com/application/portfolio-01.webp"
                                            alt="Portfolio 01"
                                            className="h-64 w-full object-cover lg:col-span-3 lg:h-120"
                                        />
                                        <img
                                            src="https://www.untitledui.com/application/portfolio-02.webp"
                                            alt="Portfolio 02"
                                            className="h-64 w-full object-cover lg:h-37.5"
                                        />
                                        <img
                                            src="https://www.untitledui.com/application/portfolio-03.webp"
                                            alt="Portfolio 03"
                                            className="h-64 w-full object-cover lg:h-37.5"
                                        />
                                        <img
                                            src="https://www.untitledui.com/application/portfolio-04.webp"
                                            alt="Portfolio 04"
                                            className="h-64 w-full object-cover lg:h-37.5"
                                        />
                                    </div>

                                    <FileUpload.DropZone />
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
