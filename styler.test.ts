import { assertEquals } from "https://deno.land/std@0.200.0/assert/mod.ts";
import { newStyler } from "./styler.ts";

Deno.test("styler", async (t) => {
  await t.step("{} --> : and snake --> snake", () => {
    const styler = newStyler({ var: ":", case: "snake" });
    assertEquals(
      styler("/user/{user_id}/contents/{contents_id}"),
      "/user/:user_id/contents/:contents_id",
    );
  });

  await t.step("{} --> : and snake --> camel", () => {
    const styler = newStyler({ var: ":", case: "camel" });
    assertEquals(
      styler(
        "/user/{user_id}/contents/{contents_id}",
      ),
      "/user/:userId/contents/:contentsId",
    );
  });

  await t.step(": --> {} and snake --> snake", () => {
    const styler = newStyler({ var: "{}", case: "snake" });
    assertEquals(
      styler(
        "/user/:user_id/contents/:contents_id",
      ),
      "/user/{user_id}/contents/{contents_id}",
    );
  });

  await t.step(": --> {} and snake --> camel", () => {
    const styler = newStyler({ var: "{}", case: "camel" });
    assertEquals(
      styler(
        "/user/:user_id/contents/:contents_id",
      ),
      "/user/{userId}/contents/{contentsId}",
    );
  });
});
