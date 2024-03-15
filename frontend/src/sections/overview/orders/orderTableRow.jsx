import moment from 'moment';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function OrderTableRow({
  selected,
  name,
  avatarUrl,
  price,
  status,
  handleClick,
  noOfProducts,
  payment,
  date,
  paymentStatus,
}) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatarUrl} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>{price}</TableCell>

      <TableCell>{noOfProducts}</TableCell>

      <TableCell>{status}</TableCell>

      <TableCell>{payment}</TableCell>

      <TableCell>
        <Label
          variant="filled"
          color={
            (paymentStatus === 'Pending' && 'error') ||
            (paymentStatus === 'Completed' && 'success') ||
            'error'
          }
        >
          {paymentStatus}
        </Label>
      </TableCell>

      <TableCell>{moment(date).format('HH:MM DD-MM-YYYY')}</TableCell>
    </TableRow>
  );
}

OrderTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  price: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  noOfProducts: PropTypes.any,
  payment: PropTypes.any,
  date: PropTypes.any,
  paymentStatus: PropTypes.any,
};
