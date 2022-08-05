import ora from "ora";
import spinners from "cli-spinners";

const spinner = ora("处理中...")
spinner.spinner = spinners.triangle
spinner.start();
spinner.color = "red"
spinner.text = "textdddddd"
spinner.succeed("处理成功1...");

// spinner.render();
// spinner.succeed("处理成功2...");
// setTimeout(() => {
//     spinner.color = 'yellow';
//     spinner.text = 'Loading rainbows';
// }, 1000);