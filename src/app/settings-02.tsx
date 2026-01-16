"use client";

import { useState } from "react";
import { Mail01, Zap } from "@untitledui/icons";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { FileUpload } from "@/components/application/file-upload/file-upload-base";
import { SectionFooter } from "@/components/application/section-footers/section-footer";
import { SectionHeader } from "@/components/application/section-headers/section-headers";
import { TableRowActionsDropdown } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { Toggle } from "@/components/base/toggle/toggle";
import { countriesOptions } from "@/utils/countries";
import { timezonesOptions } from "@/utils/timezones";

export const Settings02 = () => {
    const [uploadedAvatar, setUploadedAvatar] = useState<string | undefined>("https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80");

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

            <main className="bg-secondary pt-8 pb-16 lg:pt-12 lg:pb-24">
                <div className="flex flex-col gap-8">
                    <div className="mx-auto w-full max-w-container px-4 lg:px-8">
                        <div className="mx-auto flex w-full max-w-160 flex-col gap-6">
                            <SectionHeader.Root className="border-none pb-0">
                                <SectionHeader.Group>
                                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                                        <SectionHeader.Heading>Personal info</SectionHeader.Heading>
                                        <SectionHeader.Subheading>Update your photo and personal details here.</SectionHeader.Subheading>
                                    </div>
                                    <div className="absolute top-0 right-0 md:static">
                                        <TableRowActionsDropdown />
                                    </div>
                                </SectionHeader.Group>
                            </SectionHeader.Root>

                            <Form
                                className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const data = Object.fromEntries(new FormData(e.currentTarget));
                                    console.log("Form data:", data);
                                }}
                            >
                                <div className="flex flex-col gap-6 px-4 py-5 lg:px-6 lg:py-6">
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                        <Input isRequired label="First name" name="firstName" defaultValue="Olivia" size="md" />
                                        <Input isRequired label="Last name" name="lastName" defaultValue="Rhye" size="md" />
                                    </div>

                                    <Input
                                        isRequired
                                        label="Email address"
                                        name="email"
                                        type="email"
                                        defaultValue="olivia@untitledui.com"
                                        size="md"
                                        icon={Mail01}
                                    />

                                    <div className="flex flex-col gap-5 lg:flex-row">
                                        <Avatar size="2xl" src={uploadedAvatar} />

                                        <FileUpload.DropZone className="w-full" onDropFiles={(files) => handleAvatarUpload(files[0])} />
                                    </div>
                                </div>
                                <SectionFooter.Root isCard>
                                    <SectionFooter.Actions>
                                        <Button color="secondary" size="md">
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary" size="md">
                                            Save changes
                                        </Button>
                                    </SectionFooter.Actions>
                                </SectionFooter.Root>
                            </Form>
                        </div>
                    </div>

                    <div className="mx-auto w-full max-w-container px-4 lg:px-8">
                        <div className="mx-auto flex w-full max-w-160 flex-col gap-6">
                            <SectionHeader.Root className="border-none pb-0">
                                <SectionHeader.Group>
                                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch">
                                        <SectionHeader.Heading>Personal info</SectionHeader.Heading>
                                        <SectionHeader.Subheading>Update your photo and personal details here.</SectionHeader.Subheading>
                                    </div>
                                    <div className="absolute top-0 right-0 md:static">
                                        <TableRowActionsDropdown />
                                    </div>
                                </SectionHeader.Group>
                            </SectionHeader.Root>

                            <Form
                                className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const data = Object.fromEntries(new FormData(e.currentTarget));
                                    console.log("Form data:", data);
                                }}
                            >
                                <div className="flex flex-col gap-6 px-4 py-5 lg:p-6">
                                    <Toggle defaultSelected label="Available for projects" hint="I'm open and available for work." size="sm" />

                                    <InputGroup
                                        isRequired
                                        label="Username"
                                        name="username"
                                        size="md"
                                        defaultValue="olivia"
                                        leadingAddon={<InputGroup.Prefix>untitledui.com/</InputGroup.Prefix>}
                                    >
                                        <InputBase />
                                    </InputGroup>

                                    <InputGroup
                                        isRequired
                                        label="Website"
                                        name="website"
                                        size="md"
                                        defaultValue="www.untitledui.com"
                                        leadingAddon={<InputGroup.Prefix>http://</InputGroup.Prefix>}
                                    >
                                        <InputBase />
                                    </InputGroup>

                                    <TextArea
                                        isRequired
                                        textAreaClassName="min-h-47 resize-y lg:min-h-37"
                                        label="Description"
                                        tooltip="This will be public"
                                        defaultValue="I'm a Product Designer based in Melbourne, Australia. I specialize in UX/UI design, brand strategy, and Webflow development."
                                        hint="275 characters left"
                                    />

                                    <Select name="country" label="Country" size="md" defaultSelectedKey="AU" items={countriesOptions}>
                                        {(item) => (
                                            <Select.Item id={item.id} icon={item.icon}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>

                                    <Select
                                        name="timezone"
                                        label="Timezone"
                                        size="md"
                                        defaultSelectedKey={timezonesOptions.find((item) => item.label === "PST")?.id}
                                        items={timezonesOptions}
                                    >
                                        {(item) => (
                                            <Select.Item id={item.id} avatarUrl={item.avatarUrl} supportingText={item.supportingText} icon={item.icon}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>
                                </div>
                                <SectionFooter.Root isCard>
                                    <SectionFooter.Actions>
                                        <Button color="secondary" size="md">
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary" size="md">
                                            Save changes
                                        </Button>
                                    </SectionFooter.Actions>
                                </SectionFooter.Root>
                            </Form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
