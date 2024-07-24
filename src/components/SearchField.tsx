"use client";

import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

const SearchField = () => {
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();

    if (!q) return;

    /* The use of encodeURIComponent is to get rid off special characters in the url like # & etc because they already have a special meaning in the url */
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    /* The method and action are necessary when javascript isn't used or internet connection is very slow => Progressive Enhancement. The above handleSearch function isn't going to be called if javascript isn't available.   */
    <form onSubmit={handleSearch} method="GET" action="/search">
      <div className="relative">
        <Input
          name="q"
          placeholder="Search on VibeNet"
          className="rounded-l-3xl rounded-r-3xl pe-10"
        />
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
};
export default SearchField;
