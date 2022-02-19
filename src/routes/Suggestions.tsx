import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconHamburger from "../assets/shared/mobile/icon-hamburger.svg";
import IconClose from "../assets/shared/mobile/icon-close.svg";
import SvgIllustrationEmpty from "../assets/suggestions/illustration-empty.svg";
import Drawer from "../components/Drawer";
import FeedbackRequestCard from "../components/FeedbackRequestCard";
import IconArrowDown from "../components/icons/IconArrowDown";
import { useAppSelector } from "../hooks";
import { Category } from "../slice";

type SortBy =
  | "Most Upvotes"
  | "Least Upvotes"
  | "Most Comments"
  | "Least Comments";

const uppercaseWords = (str: string): string =>
  str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

export default function Suggestions() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("Most Upvotes");
  const [selectCategory, setSelectCategory] = useState<Category | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const feedbacks = useAppSelector((state) => state.feedbacks);

  return (
    <div className="relative min-h-full flex flex-col">
      {/* header */}
      <div className="z-20 sticky top-0 flex items-center justify-between h-[4.5rem] px-6 bg-fancy">
        <div>
          <div className="text-white font-bold">Frontend Mentor</div>
          <div className="text-white text-sm opacity-75">Feedback Board</div>
        </div>
        <div className="flex">
          <button
            type="button"
            title="openDrawer"
            className={showDrawer ? "hidden" : ""}
            onClick={() => setShowDrawer(true)}
          >
            <img src={IconHamburger} alt="" />
          </button>

          <button
            type="button"
            title="openDrawer"
            className={showDrawer ? "" : "hidden"}
            onClick={() => setShowDrawer(false)}
          >
            <img src={IconClose} alt="" />
          </button>
        </div>
      </div>

      {/* overlay */}
      <Drawer
        isOpen={showDrawer}
        onClickAwayHandler={() => setShowDrawer(false)}
      >
        <div className="pt-[4.5rem]">
          <div className="p-6 flex flex-col gap-6">
            <div className="bg-white rounded-md p-6 flex flex-wrap gap-x-2 gap-y-4">
              <div
                className={
                  "rounded-lg px-4 h-8 text-sm font-semibold flex items-center justify-center " +
                  (selectCategory === undefined
                    ? "bg-[#4661E6] text-white"
                    : "bg-[#F2F4FF] text-[#4661E6]")
                }
                onClick={() => setSelectCategory(undefined)}
              >
                All
              </div>
              {feedbacks.categories.map((c) => {
                return (
                  <div
                    className={
                      "rounded-lg px-4 h-8 text-sm font-semibold flex items-center justify-center " +
                      (selectCategory === c
                        ? "bg-[#4661E6] text-white"
                        : "bg-[#F2F4FF] text-[#4661E6]")
                    }
                    key={c}
                    onClick={() => setSelectCategory(c)}
                  >
                    {c === "ui" || c === "ux"
                      ? c.toUpperCase()
                      : uppercaseWords(c)}
                  </div>
                );
              })}
            </div>
            <div className="bg-white rounded-md p-6">
              <div className="flex items-center justify-between">
                <div className="text-[#3A4374] text-lg font-bold">Roadmap</div>
                <button className="text-[#4661E6] text-sm font-semibold underline">
                  View
                </button>
              </div>
              <div className="mt-6 grid items-center grid-cols-[auto_1fr_auto] gap-x-4 gap-y-2">
                {feedbacks.statuses
                  .filter((stat) => stat !== "suggestion")
                  .map((stat) => {
                    const result = feedbacks.productRequests.filter(
                      (p) => p.status === stat
                    );

                    return (
                      <>
                        <div
                          className={
                            "h-2 w-2 rounded-full " +
                            (stat === "planned" ? "bg-[#F49F85]" : "") +
                            (stat === "in-progress" ? "bg-[#AD1FEA]" : "") +
                            (stat === "live" ? "bg-[#62BCFA]" : "")
                          }
                        ></div>
                        <div className="text-[#647196]">
                          {uppercaseWords(stat)}
                        </div>
                        <div className="text-[#647196] font-bold">
                          {result.length}
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      <div className="relative flex flex-col flex-1">
        {/* sort and add feedback */}
        <div className="bg-[#373F68] text-white flex items-center justify-between py-2 px-6">
          <div className="flex items-baseline text-sm">
            Sort by :{" "}
            {
              <select
                name=""
                id=""
                title="sortBy"
                className="bg-transparent border-0 text-sm font-bold outline-none"
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                value={sortBy}
              >
                <option className="text-[#647196]" value="Most Upvotes">
                  Most Upvotes
                </option>
                <option className="text-[#647196]" value="Least Upvotes">
                  Least Upvotes
                </option>
                <option className="text-[#647196]" value="Most Comments">
                  Most Comments
                </option>
                <option className="text-[#647196]" value="Least Comments">
                  Least Comments
                </option>
              </select>
            }
          </div>
          <button
            type="button"
            className="bg-[#AD1FEA] rounded-lg h-10 px-4 text-sm font-bold"
            onClick={() => navigate("/feedbacks/new")}
          >
            + Add Feedback
          </button>
        </div>

        {/* feedbacks */}
        <div className="bg-[#F7F8FD] px-6 py-8 flex flex-col gap-4 flex-1">
          {/* feedback card */}
          {Array.from(feedbacks.productRequests)
            .sort((a, b) => {
              switch (sortBy) {
                case "Most Upvotes":
                  return b.upvotes - a.upvotes;
                case "Least Upvotes":
                  return a.upvotes - b.upvotes;
                case "Most Comments":
                  return (b.comments?.length ?? 0) - (a.comments?.length ?? 0);
                case "Least Comments":
                  return (a.comments?.length ?? 0) - (b.comments?.length ?? 0);
              }
            })
            .filter(
              (p) =>
                selectCategory === undefined || p.category === selectCategory
            )
            .map((product) => (
              <FeedbackRequestCard key={product.id} product={product} />
            ))}

          {/* empty state */}
          <div className="bg-white flex-1 rounded-lg flex flex-col items-center justify-center">
            <div>
              <img src={SvgIllustrationEmpty} alt="illustartion empty" />
            </div>
            <div className="mt-12 text-[#3A4374] font-bold text-lg">
              There is no feedback yet.
            </div>
            <div className="text-center text-[#647196] text-sm mt-4">
              Got a suggestion? Found a bug that needs to be squashed? We love
              hearing about new ideas to improve our app.
            </div>
            <button
              type="button"
              className="bg-[#AD1FEA] rounded-lg h-10 px-4 text-sm text-white font-bold mt-6"
              onClick={() => navigate("/feedbacks/new")}
            >
              + Add Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
